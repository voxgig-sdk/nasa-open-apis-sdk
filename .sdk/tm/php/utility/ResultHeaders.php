<?php
declare(strict_types=1);

// NasaOpenApis SDK utility: result_headers

class NasaOpenApisResultHeaders
{
    public static function call(NasaOpenApisContext $ctx): ?NasaOpenApisResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
