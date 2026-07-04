# Typed models for the NasaOpenApis SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class MarsPhoto:
    camera: dict
    earth_date: str
    id: int
    img_src: str
    rover: dict
    sol: int


@dataclass
class MarsPhotoListMatch:
    rover_id: str


@dataclass
class Planetary:
    pass


@dataclass
class PlanetaryLoadMatch:
    pass

