# MarsPhoto direct test

import json
import pytest

from nasaopenapis_sdk.utility.voxgig_struct import voxgig_struct as vs
from nasaopenapis_sdk import NasaOpenApisSDK
from nasaopenapis_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestMarsPhotoDirect:

    def test_should_direct_list_mars_photo(self):
        setup = _mars_photo_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-mars_photo", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["rover01"]:
                if setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live test blocked: needs {_live_key} via NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID")

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["rover_id"] = setup["idmap"].get("rover01")
        else:
            params["rover_id"] = "direct01"

        result = client.direct({
            "path": "mars-photos/api/v1/rovers/{rover_id}/photos",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live list failed: " + runner.live_describe(result))
            if runner.live_list(result.get("data")) is None:
                runner.live_miss(LIVE_STRICT, "Live list returned no list: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _mars_photo_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID": {},
        "NASA_OPEN_APIS_TEST_LIVE": "FALSE",
        "NASA_OPEN_APIS_APIKEY": "",
    })

    live = env.get("NASA_OPEN_APIS_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
            "apikey": env.get("NASA_OPEN_APIS_APIKEY"),
        })
        client = NasaOpenApisSDK(merged_opts)
        idmap = env.get("NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID")
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = NasaOpenApisSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
