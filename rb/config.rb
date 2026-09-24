# NasaOpenApis SDK configuration

module NasaOpenApisConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "NasaOpenApis",
        "slug" => "nasa-open-apis",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.nasa.gov",
        "auth" => {
          "prefix" => "",
          "in" => "query",
          "name" => "api_key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "mars_photo" => {},
          "planetary" => {},
        },
      },
      "entity" => {
        "mars_photo" => {
          "fields" => [
            {
              "name" => "camera",
              "title" => "Camera",
              "type" => "`$OBJECT`",
              "req" => true,
            },
            {
              "name" => "earth_date",
              "title" => "Earth Date",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Earth date when the photo was taken",
              "format" => "date",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Unique identifier for the photo",
            },
            {
              "name" => "img_src",
              "title" => "Img Src",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "URL of the image",
              "format" => "uri",
            },
            {
              "name" => "rover",
              "title" => "Rover",
              "type" => "`$OBJECT`",
              "req" => true,
            },
            {
              "name" => "sol",
              "title" => "Sol",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Martian sol when the photo was taken",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "mars_photo",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/mars-photos/api/v1/rovers/{rover}/photos",
                  "segments" => [
                    {
                      "lit" => "mars-photos",
                    },
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "rovers",
                    },
                    {
                      "var" => "rover_id",
                    },
                    {
                      "lit" => "photos",
                    },
                  ],
                  "parts" => [
                    "mars-photos",
                    "api",
                    "v1",
                    "rovers",
                    "{rover_id}",
                    "photos",
                  ],
                  "rename" => {
                    "param" => {
                      "rover" => "rover_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.photos`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "rover_id",
                        "orig" => "rover",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "DEMO_KEY",
                      },
                      {
                        "name" => "camera",
                        "orig" => "camera",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "earth_date",
                        "orig" => "earth_date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1,
                      },
                      {
                        "name" => "sol",
                        "orig" => "sol",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "api_key",
                      "camera",
                      "earth_date",
                      "page",
                      "rover_id",
                      "sol",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "planetary" => {
          "fields" => [],
          "name" => "planetary",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/planetary/apod",
                  "segments" => [
                    {
                      "lit" => "planetary",
                    },
                    {
                      "lit" => "apod",
                    },
                  ],
                  "parts" => [
                    "planetary",
                    "apod",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "api_key",
                        "orig" => "api_key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "DEMO_KEY",
                      },
                      {
                        "name" => "count",
                        "orig" => "count",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "end_date",
                        "orig" => "end_date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "start_date",
                        "orig" => "start_date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "thumb",
                        "orig" => "thumb",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "apod",
                    "exist" => [
                      "api_key",
                      "count",
                      "date",
                      "end_date",
                      "start_date",
                      "thumb",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    NasaOpenApisFeatures.make_feature(name)
  end
end
