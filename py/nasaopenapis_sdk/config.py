# NasaOpenApis SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "NasaOpenApis",
            "slug": "nasa-open-apis",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.nasa.gov",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "mars_photo": {},
                "planetary": {},
            },
        },
        "entity": {
      "mars_photo": {
        "fields": [
          {
            "name": "camera",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "format": "date",
            "name": "earth_date",
            "req": True,
            "short": "Earth date when the photo was taken",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier for the photo",
            "type": "`$INTEGER`",
          },
          {
            "format": "uri",
            "name": "img_src",
            "req": True,
            "short": "URL of the image",
            "type": "`$STRING`",
          },
          {
            "name": "rover",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "sol",
            "req": True,
            "short": "Martian sol when the photo was taken",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "mars_photo",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "rover_id",
                      "orig": "rover",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "DEMO_KEY",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "camera",
                      "orig": "camera",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "earth_date",
                      "orig": "earth_date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "sol",
                      "orig": "sol",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/mars-photos/api/v1/rovers/{rover}/photos",
                "rename": {
                  "param": {
                    "rover": "rover_id",
                  },
                },
                "segments": [
                  {
                    "lit": "mars-photos",
                  },
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "rovers",
                  },
                  {
                    "var": "rover_id",
                  },
                  {
                    "lit": "photos",
                  },
                ],
                "select": {
                  "exist": [
                    "api_key",
                    "camera",
                    "earth_date",
                    "page",
                    "rover_id",
                    "sol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.photos`",
                },
                "parts": [
                  "mars-photos",
                  "api",
                  "v1",
                  "rovers",
                  "{rover_id}",
                  "photos",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "rover",
            ],
          ],
        },
      },
      "planetary": {
        "fields": [],
        "name": "planetary",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "DEMO_KEY",
                      "kind": "query",
                      "name": "api_key",
                      "orig": "api_key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "thumb",
                      "orig": "thumb",
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/planetary/apod",
                "segments": [
                  {
                    "lit": "planetary",
                  },
                  {
                    "lit": "apod",
                  },
                ],
                "select": {
                  "$action": "apod",
                  "exist": [
                    "api_key",
                    "count",
                    "date",
                    "end_date",
                    "start_date",
                    "thumb",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "planetary",
                  "apod",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
