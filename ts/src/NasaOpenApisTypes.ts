// Typed models for the NasaOpenApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface MarsPhoto {
  camera: Record<string, any>
  earth_date: string
  id: number
  img_src: string
  rover: Record<string, any>
  sol: number
}

export interface MarsPhotoListMatch {
  rover_id: string
  api_key: string
  camera?: string
  earth_date?: string
  page?: number
  sol?: number
}

export interface Planetary {
}

export interface PlanetaryLoadMatch {
  api_key: string
  count?: number
  date?: string
  end_date?: string
  start_date?: string
  thumb?: boolean

  // Selects a custom action instead of the plain load:
  //   'apod'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

