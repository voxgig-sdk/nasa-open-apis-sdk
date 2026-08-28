// Typed models for the NasaOpenApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/nasa-open-apis-sdk/go/core"
)

// MarsPhoto is the typed data model for the mars_photo entity.
type MarsPhoto struct {
	Camera map[string]any `json:"camera"`
	EarthDate string `json:"earth_date"`
	Id int `json:"id"`
	ImgSrc string `json:"img_src"`
	Rover map[string]any `json:"rover"`
	Sol int `json:"sol"`
}

// MarsPhotoListMatch is the typed request payload for MarsPhoto.ListTyped.
type MarsPhotoListMatch struct {
	RoverId string `json:"rover_id"`
	ApiKey string `json:"api_key"`
	Camera *string `json:"camera,omitempty"`
	EarthDate *string `json:"earth_date,omitempty"`
	Page *int `json:"page,omitempty"`
	Sol *int `json:"sol,omitempty"`
}

// Planetary is the typed data model for the planetary entity.
type Planetary struct {
}

// PlanetaryLoadMatch is the typed request payload for Planetary.LoadTyped.
type PlanetaryLoadMatch struct {
	ApiKey string `json:"api_key"`
	Count *int `json:"count,omitempty"`
	Date *string `json:"date,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Thumb *bool `json:"thumb,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
