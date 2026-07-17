# nasa-open-apis-cli

AQL-driven command-line client **and** interactive REPL for the NasaOpenApis
SDK. Each command line is parsed as a single [AQL](https://github.com/aql-lang/aql)
expression and evaluated against the live API; run it with no arguments to drop
into a REPL. Built on `github.com/aql-lang/aql/eng/go` and the sibling Go SDK
at `../go`.

## Examples

```sh
# 1. Build a native binary (-> dist/<os>-<arch>/nasa-open-apis-cli)
make build

# 2. Provide credentials once, via the environment
export NASA_OPEN_APIS_APIKEY=sk_live_xxx

# 3. Each command line is ONE AQL expression, run against the API:
./nasa-open-apis-cli list mars_photo
./nasa-open-apis-cli list planetary

# 4. Override the API base URL for a single call
NASA_OPEN_APIS_BASE=https://api.example.com ./nasa-open-apis-cli list mars_photo

# 5. No arguments -> interactive REPL
./nasa-open-apis-cli
nasa-open-apis> list mars_photo
nasa-open-apis> :quit
```

> The rest of this guide follows the [Diátaxis](https://diataxis.fr) framework:
> a hands-on **Tutorial**, task-focused **How-to guides**, a factual
> **Reference**, and background **Explanation**.

## Tutorial: your first query in under a minute

1. **Build the binary.** From this `go-cli/` directory:

   ```sh
   make build          # -> dist/<os>-<arch>/nasa-open-apis-cli
   ```

2. **Set your API key** (read from the environment):

   ```sh
   export NASA_OPEN_APIS_APIKEY=sk_live_xxx
   ```

3. **Run a query.** Evaluate an AQL expression against the API (or run with no
   arguments to open the REPL):

   ```sh
   ./dist/*/nasa-open-apis-cli list mars_photo
   ```

4. **Go interactive.** Run the binary with no arguments to open the REPL, then
   type `:help` for the word and entity lists and `:quit` to leave.

That is the whole loop: *build → set key → evaluate AQL expressions*.

## How-to guides

### List the records of an entity

```sh
./nasa-open-apis-cli list mars_photo
```

`list <entity>` returns the first page of records. `<entity>` is a bareword —
it is auto-quoted as an AQL atom, so no quotes are needed.

### Authenticate and choose an environment

Configuration is read from the environment — nothing is written to disk:

```sh
export NASA_OPEN_APIS_APIKEY=sk_live_xxx            # API key
export NASA_OPEN_APIS_BASE=https://api.example.com  # optional: override the API base URL
./nasa-open-apis-cli list mars_photo
```

Both are injectable by a secrets vault, so the key never has to be typed inline.

### Explore interactively with the REPL

Run with no arguments to open a REPL (prompt `nasa-open-apis>`). Each line is
evaluated as its own AQL expression:

```text
$ ./nasa-open-apis-cli
nasa-open-apis> list mars_photo
nasa-open-apis> :help
nasa-open-apis> :quit
```

### Cross-compile release binaries

```sh
make build       # native binary for this machine
make build-all   # linux/darwin/windows x amd64/arm64, under dist/<os>-<arch>/
```

### Discover the available entities

`:help` in the REPL prints the full entity list, or see [Entities](#entities)
below — this SDK exposes 2 entities.

## Reference

### Words

The CLI registers these AQL words, each bound to the SDK:

| Word     | Signatures                                    | Returns                        |
|----------|-----------------------------------------------|--------------------------------|
| `list`   | `list <entity>` · `list <query> <entity>`     | First page of records          |
| `load`   | `load <entity>` · `load <query> <entity>`     | A single record                |

- `<entity>` is a bareword, auto-quoted as an AQL atom (e.g. `mars_photo`).
- `<query>` is either a **Map** (`{id:1}`) or a **Scalar** (`1`, treated as
  `{id:1}`). A scalar is always wrapped as `{id:<value>}`.

### Environment variables

| Variable | Purpose |
|----------|---------|
| `NASA_OPEN_APIS_APIKEY` | API key sent with every request. |
| `NASA_OPEN_APIS_BASE` | Optional override of the API base URL. |

Unset variables fall back to the SDK's built-in defaults.

### REPL commands

- `:quit` / `:q` / `:exit` — exit the REPL
- `:help` / `:h` / `:?`     — show the word list, entity list and meta commands

### Exit codes

| Code | Meaning |
|------|---------|
| `0` | Success (also the normal REPL exit). |
| `1` | Parse error, word-registration error, or an API/evaluation error. |

### Build targets

| Target | Result |
|--------|--------|
| `make build` | Native binary at `dist/<os>-<arch>/nasa-open-apis-cli`. |
| `make build-all` | linux/darwin/windows x amd64/arm64, each under its own `dist/<os>-<arch>/`. |
| `make clean` | Remove `dist/` and any stray binaries. |

### Entities

The 2 entities this SDK exposes (any is valid as `<entity>`):

mars_photo planetary

## Explanation

### Why AQL?

The whole command line is one [AQL](https://github.com/aql-lang/aql) expression,
not a fixed `verb --flag` grammar. That means the same binary works one-shot
(`./nasa-open-apis-cli <expr>`) and interactively (the REPL), and expressions compose the
same way in both. `list` / `load` / `update` are ordinary AQL *words* bound to
the SDK — adding SDK operations is adding words, not re-parsing flags.

### How it is wired

`main.go` builds the SDK client (configured from the environment), creates an
AQL registry, and `words.go` registers `list` / `load` / `update` as native
words that dispatch on the entity atom and call the sibling Go SDK at `../go`.
Results are unwrapped from their `Entity` wrappers to plain data before being
printed.

### Output format

Each result value is printed as its AQL string form (a JSON-like rendering of
the record or list of records). One-shot mode prints to stdout; errors go to
stderr with a non-zero exit code.

## Generated by

sdkgen `go-cli` target. See the target source under `.sdk/src/cmp/go-cli/` in
this repo, or upstream at
`github.com/voxgig/sdkgen/project/.sdk/src/cmp/go-cli/`.
