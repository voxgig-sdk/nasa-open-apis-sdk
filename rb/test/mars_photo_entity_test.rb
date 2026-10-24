# MarsPhoto entity test

require "minitest/autorun"
require "json"
require_relative "../NasaOpenApis_sdk"
require_relative "runner"

class MarsPhotoEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = NasaOpenApisSDK.test(nil, nil)
    ent = testsdk.MarsPhoto(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = NasaOpenApisConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = NasaOpenApisSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.MarsPhoto(nil).list({ "rover_id" => 1, "api_key" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = mars_photo_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "mars_photo." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["rover01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    mars_photo_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.mars_photo")))
    mars_photo_ref01_data = nil
    if mars_photo_ref01_data_raw.length > 0
      mars_photo_ref01_data = Helpers.to_map(mars_photo_ref01_data_raw[0][1])
    end

    # LIST
    mars_photo_ref01_ent = client.MarsPhoto(nil)
    mars_photo_ref01_match = {
      "rover_id" => setup[:idmap]["rover01"],
    }

    mars_photo_ref01_list_result = mars_photo_ref01_ent.list(mars_photo_ref01_match, nil)
    assert mars_photo_ref01_list_result.is_a?(Array)

  end
end

def mars_photo_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "mars_photo", "MarsPhotoTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = NasaOpenApisSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["mars_photo01", "mars_photo02", "mars_photo03", "rover01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID" => idmap,
    "NASA_OPEN_APIS_TEST_LIVE" => "FALSE",
    "NASA_OPEN_APIS_TEST_EXPLAIN" => "FALSE",
    "NASA_OPEN_APIS_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["NASA_OPEN_APIS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["NASA_OPEN_APIS_APIKEY"],
      },
      extra || {},
    ])
    client = NasaOpenApisSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["NASA_OPEN_APIS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["NASA_OPEN_APIS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
