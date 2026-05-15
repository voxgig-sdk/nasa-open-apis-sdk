<?php
declare(strict_types=1);

// NasaOpenApis SDK utility: feature_add

class NasaOpenApisFeatureAdd
{
    public static function call(NasaOpenApisContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
