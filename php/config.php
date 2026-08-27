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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.nasa.gov",
                "auth" => [
                    "prefix" => "",
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
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'earth_date',
              'req' => true,
              'short' => 'Earth date when the photo was taken',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier for the photo',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'img_src',
              'req' => true,
              'short' => 'URL of the image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rover',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sol',
              'req' => true,
              'short' => 'Martian sol when the photo was taken',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'mars_photo',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'rover_id',
                        'orig' => 'rover',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'DEMO_KEY',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'camera',
                        'orig' => 'camera',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'earth_date',
                        'orig' => 'earth_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sol',
                        'orig' => 'sol',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/mars-photos/api/v1/rovers/{rover}/photos',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.photos`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'rover',
              ],
            ],
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
                  'args' => [
                    'query' => [
                      [
                        'example' => 'DEMO_KEY',
                        'kind' => 'query',
                        'name' => 'api_key',
                        'orig' => 'api_key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'count',
                        'orig' => 'count',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'end_date',
                        'orig' => 'end_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'start_date',
                        'orig' => 'start_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'thumb',
                        'orig' => 'thumb',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/planetary/apod',
                  'parts' => [
                    'planetary',
                    'apod',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
