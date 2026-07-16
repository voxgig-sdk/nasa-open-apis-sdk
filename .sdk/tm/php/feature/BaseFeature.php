<?php
declare(strict_types=1);

// NasaOpenApis SDK base feature

class NasaOpenApisBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NasaOpenApisContext $ctx, array $options): void {}
    public function PostConstruct(NasaOpenApisContext $ctx): void {}
    public function PostConstructEntity(NasaOpenApisContext $ctx): void {}
    public function SetData(NasaOpenApisContext $ctx): void {}
    public function GetData(NasaOpenApisContext $ctx): void {}
    public function GetMatch(NasaOpenApisContext $ctx): void {}
    public function SetMatch(NasaOpenApisContext $ctx): void {}
    public function PrePoint(NasaOpenApisContext $ctx): void {}
    public function PreSpec(NasaOpenApisContext $ctx): void {}
    public function PreRequest(NasaOpenApisContext $ctx): void {}
    public function PreResponse(NasaOpenApisContext $ctx): void {}
    public function PreResult(NasaOpenApisContext $ctx): void {}
    public function PreDone(NasaOpenApisContext $ctx): void {}
    public function PreUnexpected(NasaOpenApisContext $ctx): void {}
}
