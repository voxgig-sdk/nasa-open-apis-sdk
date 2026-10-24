-- MarsPhoto direct test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("nasa-open-apis_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true

local function live_ok(result, err)
  if err ~= nil or type(result) ~= "table" or result["err"] ~= nil or not result["ok"] then
    return false
  end
  local status = helpers.to_int(result["status"])
  return status >= 200 and status < 300
end

describe("MarsPhotoDirect", function()
  it("should direct-list-mars_photo", function()
    local setup = mars_photo_direct_setup({
      { id = "direct01" },
      { id = "direct02" },
    })
    local _should_skip, _reason = runner.is_control_skipped("direct", "direct-list-mars_photo", setup.live and "live" or "unit")
    if _should_skip then
      pending(_reason or "skipped via sdk-test-control.json")
      return
    end
    if setup.live then
      for _, _live_key in ipairs({"rover01"}) do
        if setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live test blocked: needs " .. _live_key .. " via NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID")
        end
      end
    end
    local client = setup.client

    local params = {}
    if setup.live then
      params["rover_id"] = setup.idmap["rover01"]
    else
      params["rover_id"] = "direct01"
    end

    local result, err = client:direct({
      path = "mars-photos/api/v1/rovers/{rover_id}/photos",
      method = "GET",
      params = params,
    })
    if setup.live then
      if not live_ok(result, err) then
        runner.live_miss(pending, LIVE_STRICT, "Live list failed: " .. runner.live_describe(result, err))
      end
      if runner.live_list(result["data"]) == nil then
        runner.live_miss(pending, LIVE_STRICT, "Live list returned no list: " .. runner.live_describe(result, err))
      end
      assert.is_table(runner.live_list(result["data"]))
    else
      assert.is_nil(err)
      assert.is_true(result["ok"])
      assert.are.equal(200, helpers.to_int(result["status"]))
      assert.is_table(result["data"])
      assert.are.equal(2, #result["data"])
      assert.are.equal(1, #setup.calls)
    end
  end)

end)


function mars_photo_direct_setup(mockres)
  runner.load_env_local()

  local calls = {}

  local env = runner.env_override({
    ["NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID"] = {},
    ["NASA_OPEN_APIS_TEST_LIVE"] = "FALSE",
    ["NASA_OPEN_APIS_APIKEY"] = "",
  })

  local live = env["NASA_OPEN_APIS_TEST_LIVE"] == "TRUE"

  if live then
    local merged_opts = {
      apikey = env["NASA_OPEN_APIS_APIKEY"],
    }
    -- sdk-test-control.json's test.client.options goes UNDER the generated
    -- fields: it adds to the live client, it does not redirect it.
    for _k, _v in pairs(runner.live_client_options()) do
      if merged_opts[_k] == nil then
        merged_opts[_k] = _v
      end
    end
    local client = sdk.new(merged_opts)
    local idmap = env["NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID"]
    return {
      client = client,
      calls = calls,
      live = true,
      idmap = type(idmap) == "table" and idmap or {},
    }
  end

  local function mock_fetch(url, init)
    table.insert(calls, { url = url, init = init })
    return {
      status = 200,
      statusText = "OK",
      headers = {},
      json = function()
        if mockres ~= nil then
          return mockres
        end
        return { id = "direct01" }
      end,
      body = "mock",
    }, nil
  end

  local client = sdk.new({
    base = "http://localhost:8080",
    system = {
      fetch = mock_fetch,
    },
  })

  return {
    client = client,
    calls = calls,
    live = false,
    idmap = {},
  }
end
