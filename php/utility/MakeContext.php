<?php
declare(strict_types=1);

// NasaOpenApis SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NasaOpenApisMakeContext
{
    public static function call(array $ctxmap, ?NasaOpenApisContext $basectx): NasaOpenApisContext
    {
        return new NasaOpenApisContext($ctxmap, $basectx);
    }
}
