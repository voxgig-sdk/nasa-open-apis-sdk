# NasaOpenApis SDK

Tap NASA's open data: imagery, planetary science, and near-Earth object feeds via a single API key

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About NASA Open APIs

[NASA Open APIs](https://api.nasa.gov) is a developer-facing gateway to public datasets from the U.S. National Aeronautics and Space Administration. The portal bundles a number of independent NASA APIs (Astronomy Picture of the Day, Mars Rover Photos, Near-Earth Object Web Service, EPIC, EONET, and more) behind a shared `api_key` query parameter.

What you typically get from these APIs:

- Daily astronomy imagery and explanations (APOD)
- Photographs from the Curiosity, Opportunity, and Spirit Mars rovers, queryable by sol or Earth date and camera
- Near-Earth asteroid feeds, lookups, and the full browseable catalogue
- Earth imagery from the DSCOVR EPIC camera and Landsat
- Natural event tracking via EONET

Authentication is via an `api_key` query string parameter. A shared `DEMO_KEY` is available for quick experimentation but is rate-limited (commonly 30 requests/hour and 50/day per IP); a free personal key from https://api.nasa.gov raises the limits substantially. CORS is enabled for most endpoints.

## Try it

**TypeScript**
```bash
npm install nasa-open-apis
```

**Python**
```bash
pip install nasa-open-apis-sdk
```

**PHP**
```bash
composer require voxgig/nasa-open-apis-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/nasa-open-apis-sdk/go
```

**Ruby**
```bash
gem install nasa-open-apis-sdk
```

**Lua**
```bash
luarocks install nasa-open-apis-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NasaOpenApisSDK } from 'nasa-open-apis'

const client = new NasaOpenApisSDK({})

// List all marsphotos
const marsphotos = await client.MarsPhoto().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o nasa-open-apis-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "nasa-open-apis": {
      "command": "/abs/path/to/nasa-open-apis-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **MarsPhoto** | Photographs taken by NASA's Mars rovers (Curiosity, Opportunity, Spirit), filterable by sol, Earth date, and camera; served from the Mars Rover Photos API under paths such as `/mars-photos/api/v1/rovers/{rover}/photos`. | `/mars-photos/api/v1/rovers/{rover}/photos` |
| **Planetary** | Planetary-science endpoints, most notably the Astronomy Picture of the Day (APOD) at `/planetary/apod`, returning the daily image or video plus its title, explanation, and copyright (if any). | `/planetary/apod` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from nasaopenapis_sdk import NasaOpenApisSDK

client = NasaOpenApisSDK({})

# List all marsphotos
marsphotos, err = client.MarsPhoto(None).list(None, None)
```

### PHP

```php
<?php
require_once 'nasaopenapis_sdk.php';

$client = new NasaOpenApisSDK([]);

// List all marsphotos
[$marsphotos, $err] = $client->MarsPhoto(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/nasa-open-apis-sdk/go"

client := sdk.NewNasaOpenApisSDK(map[string]any{})

// List all marsphotos
marsphotos, err := client.MarsPhoto(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "NasaOpenApis_sdk"

client = NasaOpenApisSDK.new({})

# List all marsphotos
marsphotos, err = client.MarsPhoto(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("nasa-open-apis_sdk")

local client = sdk.new({})

-- List all marsphotos
local marsphotos, err = client:MarsPhoto(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NasaOpenApisSDK.test()
const result = await client.MarsPhoto().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NasaOpenApisSDK.test(None, None)
result, err = client.MarsPhoto(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NasaOpenApisSDK::test(null, null);
[$result, $err] = $client->MarsPhoto(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.MarsPhoto(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NasaOpenApisSDK.test(nil, nil)
result, err = client.MarsPhoto(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:MarsPhoto(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the NASA Open APIs

- Upstream: [https://api.nasa.gov](https://api.nasa.gov)

- Most data and imagery served by NASA is in the public domain in the United States and free to use.
- Some images may include third-party content (e.g., from partner agencies or photographers) with separate restrictions.
- Follow NASA's media usage guidelines and avoid implying NASA endorsement of derived products.
- See https://www.nasa.gov/nasa-brand-center/images-and-media/ for the official terms.

---

Generated from the NASA Open APIs OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
