<?php
declare(strict_types=1);

// NasaOpenApis SDK configuration

class NasaOpenApisConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NasaOpenApis",
                "slug" => "nasa-open-apis",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.nasa.gov",
                "auth" => [
                    "prefix" => "",
                    "in" => "query",
                    "name" => "api_key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "mars_photo" => [],
                    "planetary" => [],
                ],
            ],
            "entity" => [
        'mars_photo' => [
          'fields' => [
            [
              'name' => 'camera',
              'title' => 'Camera',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'earth_date',
              'title' => 'Earth Date',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Earth date when the photo was taken',
              'format' => 'date',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Unique identifier for the photo',
            ],
            [
              'name' => 'img_src',
              'title' => 'Img Src',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'URL of the image',
              'format' => 'uri',
            ],
            [
              'name' => 'rover',
              'title' => 'Rover',
              'type' => '`$OBJECT`',
              'req' => true,
            ],
            [
              'name' => 'sol',
              'title' => 'Sol',
              'type' => '`$INTEGER`',
              'req' => true,
              'short' => 'Martian sol when the photo was taken',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'mars_photo',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mars-photos/api/v1/rovers/{rover}/photos',
                  'segments' => [
                    [
                      'lit' => 'mars-photos',
                    ],
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'rovers',
                    ],
                    [
                      'var' => 'rover_id',
                    ],
                    [
                      'lit' => 'photos',
                    ],
                  ],
                  'parts' => [
                    'mars-photos',
                    'api',
                    'v1',
                    'rovers',
                    '{rover_id}',
                    'photos',
                  ],
                  'rename' => [
                    'param' => [
                      'rover' => 'rover_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.photos`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'rover_id',
                        'orig' => 'rover',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'DEMO_KEY',
                      ],
                      [
                        'name' => 'camera',
                        'orig' => 'camera',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'earth_date',
                        'orig' => 'earth_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1,
                      ],
                      [
                        'name' => 'sol',
                        'orig' => 'sol',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'api_key',
                      'camera',
                      'earth_date',
                      'page',
                      'rover_id',
                      'sol',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'planetary' => [
          'fields' => [],
          'name' => 'planetary',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/planetary/apod',
                  'segments' => [
                    [
                      'lit' => 'planetary',
                    ],
                    [
                      'lit' => 'apod',
                    ],
                  ],
                  'parts' => [
                    'planetary',
                    'apod',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 'DEMO_KEY',
                      ],
                      [
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'thumb',
                        'orig' => 'thumb',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                        'example' => false,
                      ],
                    ],
                  ],
                  'select' => [
                    '$action' => 'apod',
                    'exist' => [
                      'api_key',
                      'count',
                      'date',
                      'end_date',
                      'start_date',
                      'thumb',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NasaOpenApisFeatures::make_feature($name);
    }
}
