<?php
declare(strict_types=1);

// Typed models for the NasaOpenApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** MarsPhoto entity data model. */
class MarsPhoto
{
    public array $camera;
    public string $earth_date;
    public int $id;
    public string $img_src;
    public array $rover;
    public int $sol;
}

/** Request payload for MarsPhoto#list. */
class MarsPhotoListMatch
{
    public string $rover_id;
    public string $api_key;
    public ?string $camera = null;
    public ?string $earth_date = null;
    public ?int $page = null;
    public ?int $sol = null;
}

/** Planetary entity data model. */
class Planetary
{
}

/** Request payload for Planetary#load. */
class PlanetaryLoadMatch
{
    public string $api_key;
    public ?int $count = null;
    public ?string $date = null;
    public ?string $end_date = null;
    public ?string $start_date = null;
    public ?bool $thumb = null;
}

