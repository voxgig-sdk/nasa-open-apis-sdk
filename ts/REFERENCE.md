# NasaOpenApis TypeScript SDK Reference

Complete API reference for the NasaOpenApis TypeScript SDK.


## NasaOpenApisSDK

### Constructor

```ts
new NasaOpenApisSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NasaOpenApisSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = NasaOpenApisSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `NasaOpenApisSDK` instance in test mode.


### Instance Methods

#### `MarsPhoto(data?: object)`

Create a new `MarsPhoto` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarsPhotoEntity` instance.

#### `Planetary(data?: object)`

Create a new `Planetary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlanetaryEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `NasaOpenApisSDK.test()`.

**Returns:** `NasaOpenApisSDK` instance in test mode.


---

## MarsPhotoEntity

```ts
const mars_photo = client.MarsPhoto()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camera` | `Record<string, any>` | Yes |  |
| `earth_date` | `string` | Yes |  |
| `id` | `number` | Yes |  |
| `img_src` | `string` | Yes |  |
| `rover` | `Record<string, any>` | Yes |  |
| `sol` | `number` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MarsPhoto().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarsPhotoEntity` instance with the same client and
options.

#### `client()`

Return the parent `NasaOpenApisSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlanetaryEntity

```ts
const planetary = client.Planetary()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Planetary().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlanetaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `NasaOpenApisSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new NasaOpenApisSDK({
  feature: {
    test: { active: true },
  }
})
```

