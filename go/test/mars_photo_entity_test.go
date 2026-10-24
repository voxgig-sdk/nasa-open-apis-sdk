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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const mars_photoEntityLiveStrict = true


func TestMarsPhotoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.MarsPhoto(nil)
		if ent == nil {
			t.Fatal("expected non-nil MarsPhotoEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.MarsPhoto(nil).List(map[string]any{"rover_id": 1, "api_key": "x"}, nil)
		if sdkerr, ok := err.(*core.NasaOpenApisError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
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
		if setup.live {
			for _, _liveKey := range []string{"rover01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, mars_photoEntityLiveStrict, "Live entity test blocked: needs %s via NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		marsPhotoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.mars_photo")))
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
	idmap, _ := vs.Transform(
		[]any{"mars_photo01", "mars_photo02", "mars_photo03", "rover01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID": idmap,
		"NASA_OPEN_APIS_TEST_LIVE":      "FALSE",
		"NASA_OPEN_APIS_TEST_EXPLAIN":   "FALSE",
		"NASA_OPEN_APIS_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NASA_OPEN_APIS_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["NASA_OPEN_APIS_APIKEY"],
			},
			extraOpts,
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
