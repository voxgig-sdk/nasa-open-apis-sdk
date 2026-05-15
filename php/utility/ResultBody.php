<?php
declare(strict_types=1);

// NasaOpenApis SDK utility: result_body

class NasaOpenApisResultBody
{
    public static function call(NasaOpenApisContext $ctx): ?NasaOpenApisResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
