# frozen_string_literal: true

# Typed models for the NasaOpenApis SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# MarsPhoto entity data model.
#
# @!attribute [rw] camera
#   @return [Hash]
#
# @!attribute [rw] earth_date
#   @return [String]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] img_src
#   @return [String]
#
# @!attribute [rw] rover
#   @return [Hash]
#
# @!attribute [rw] sol
#   @return [Integer]
MarsPhoto = Struct.new(
  :camera,
  :earth_date,
  :id,
  :img_src,
  :rover,
  :sol,
  keyword_init: true
)

# Request payload for MarsPhoto#list.
#
# @!attribute [rw] rover_id
#   @return [String]
MarsPhotoListMatch = Struct.new(
  :rover_id,
  keyword_init: true
)

# Planetary entity data model.
class Planetary
end

# Match filter for Planetary#load (any subset of Planetary fields).
class PlanetaryLoadMatch
end

