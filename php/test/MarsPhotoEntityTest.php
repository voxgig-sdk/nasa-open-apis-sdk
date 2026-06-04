<?php
declare(strict_types=1);

// MarsPhoto entity test

require_once __DIR__ . '/../nasaopenapis_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MarsPhotoEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = NasaOpenApisSDK::test(null, null);
        $ent = $testsdk->MarsPhoto(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = mars_photo_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "mars_photo." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set NASAOPENAPIS_TEST_MARS_PHOTO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $mars_photo_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.mars_photo")));
        $mars_photo_ref01_data = null;
        if (count($mars_photo_ref01_data_raw) > 0) {
            $mars_photo_ref01_data = Helpers::to_map($mars_photo_ref01_data_raw[0][1]);
        }

        // LIST
        $mars_photo_ref01_ent = $client->MarsPhoto(null);
        $mars_photo_ref01_match = [
            "rover_id" => $setup["idmap"]["rover01"],
        ];

        [$mars_photo_ref01_list_result, $err] = $mars_photo_ref01_ent->list($mars_photo_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($mars_photo_ref01_list_result);

    }
}

function mars_photo_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/mars_photo/MarsPhotoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = NasaOpenApisSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["mars_photo01", "mars_photo02", "mars_photo03", "rover01", "rover02", "rover03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("NASAOPENAPIS_TEST_MARS_PHOTO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "NASAOPENAPIS_TEST_MARS_PHOTO_ENTID" => $idmap,
        "NASAOPENAPIS_TEST_LIVE" => "FALSE",
        "NASAOPENAPIS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["NASAOPENAPIS_TEST_MARS_PHOTO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["NASAOPENAPIS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new NasaOpenApisSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["NASAOPENAPIS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["NASAOPENAPIS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
