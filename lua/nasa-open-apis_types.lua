-- Typed models for the NasaOpenApis SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class MarsPhoto
---@field camera table
---@field earth_date string
---@field id number
---@field img_src string
---@field rover table
---@field sol number

---@class MarsPhotoListMatch
---@field rover_id string

---@class Planetary

---@class PlanetaryLoadMatch

local M = {}

return M
