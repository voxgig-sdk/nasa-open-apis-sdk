<?php
declare(strict_types=1);

// NasaOpenApis SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NasaOpenApisFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NasaOpenApisBaseFeature();
            case "test":
                return new NasaOpenApisTestFeature();
            default:
                return new NasaOpenApisBaseFeature();
        }
    }
}
