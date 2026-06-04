# NasaOpenApis SDK configuration


def make_config():
    return {
        "main": {
            "name": "NasaOpenApis",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.nasa.gov",
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
            "active": True,
            "index$": 0,
          },
          {
            "name": "earth_date",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "img_src",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "rover",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "sol",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 5,
          },
        ],
        "name": "mars_photo",
        "op": {
          "list": {
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
                      "active": True,
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
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "camera",
                      "orig": "camera",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "earth_date",
                      "orig": "earth_date",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "sol",
                      "orig": "sol",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/mars-photos/api/v1/rovers/{rover}/photos",
                "parts": [
                  "mars-photos",
                  "api",
                  "v1",
                  "rovers",
                  "{rover_id}",
                  "photos",
                ],
                "rename": {
                  "param": {
                    "rover": "rover_id",
                  },
                },
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
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
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "thumb",
                      "orig": "thumb",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/planetary/apod",
                "parts": [
                  "planetary",
                  "apod",
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
