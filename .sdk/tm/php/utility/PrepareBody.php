<?php
declare(strict_types=1);

// NasaOpenApis SDK utility: prepare_body

class NasaOpenApisPrepareBody
{
    public static function call(NasaOpenApisContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
