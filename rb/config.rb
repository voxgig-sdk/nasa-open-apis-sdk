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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.nasa.gov",
        "auth" => {
          "prefix" => "",
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
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "earth_date",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "img_src",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "rover",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sol",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "mars_photo",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "rover_id",
                        "orig" => "rover",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "DEMO_KEY",
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "camera",
                        "orig" => "camera",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "earth_date",
                        "orig" => "earth_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "sol",
                        "orig" => "sol",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/mars-photos/api/v1/rovers/{rover}/photos",
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.photos`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "rover",
              ],
            ],
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
                  "args" => {
                    "query" => [
                      {
                        "example" => "DEMO_KEY",
                        "kind" => "query",
                        "name" => "api_key",
                        "orig" => "api_key",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "count",
                        "orig" => "count",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "end_date",
                        "orig" => "end_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "start_date",
                        "orig" => "start_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "thumb",
                        "orig" => "thumb",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/planetary/apod",
                  "parts" => [
                    "planetary",
                    "apod",
                  ],
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
