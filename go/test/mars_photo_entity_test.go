package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/nasa-open-apis-sdk/go"
	"github.com/voxgig-sdk/nasa-open-apis-sdk/go/core"

	vs "github.com/voxgig-sdk/nasa-open-apis-sdk/go/utility/struct"
)

func TestMarsPhotoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.MarsPhoto(nil)
		if ent == nil {
			t.Fatal("expected non-nil MarsPhotoEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"mars_photo": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.MarsPhoto(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.MarsPhoto(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := mars_photoBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "mars_photo." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		marsPhotoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.mars_photo", setup.data)))
		var marsPhotoRef01Data map[string]any
		if len(marsPhotoRef01DataRaw) > 0 {
			marsPhotoRef01Data = core.ToMapAny(marsPhotoRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = marsPhotoRef01Data

		// LIST
		marsPhotoRef01Ent := client.MarsPhoto(nil)
		marsPhotoRef01Match := map[string]any{
			"rover_id": setup.idmap["rover01"],
		}

		marsPhotoRef01ListResult, err := marsPhotoRef01Ent.List(marsPhotoRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, marsPhotoRef01ListOk := marsPhotoRef01ListResult.([]any)
		if !marsPhotoRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", marsPhotoRef01ListResult)
		}

	})
}

func mars_photoBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "mars_photo", "MarsPhotoTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read mars_photo test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse mars_photo test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"mars_photo01", "mars_photo02", "mars_photo03", "rover01", "rover02", "rover03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID": idmap,
		"NASA_OPEN_APIS_TEST_LIVE":      "FALSE",
		"NASA_OPEN_APIS_TEST_EXPLAIN":   "FALSE",
		"NASA_OPEN_APIS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NASA_OPEN_APIS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["NASA_OPEN_APIS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewNasaOpenApisSDK(core.ToMapAny(mergedOpts))
	}

	live := env["NASA_OPEN_APIS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["NASA_OPEN_APIS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
