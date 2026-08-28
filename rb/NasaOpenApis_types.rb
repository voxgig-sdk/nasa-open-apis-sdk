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
#
# @!attribute [rw] api_key
#   @return [String]
#
# @!attribute [rw] camera
#   @return [String, nil]
#
# @!attribute [rw] earth_date
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] sol
#   @return [Integer, nil]
MarsPhotoListMatch = Struct.new(
  :rover_id,
  :api_key,
  :camera,
  :earth_date,
  :page,
  :sol,
  keyword_init: true
)

# Planetary entity data model.
class Planetary
end

# Request payload for Planetary#load.
#
# @!attribute [rw] api_key
#   @return [String]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
#
# @!attribute [rw] thumb
#   @return [Boolean, nil]
PlanetaryLoadMatch = Struct.new(
  :api_key,
  :count,
  :date,
  :end_date,
  :start_date,
  :thumb,
  keyword_init: true
)

