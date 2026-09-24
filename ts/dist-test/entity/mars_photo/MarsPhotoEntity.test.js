"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MarsPhotoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NASA_OPEN_APIS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NASA_OPEN_APIS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NasaOpenApisSDK.test();
        const ent = testsdk.MarsPhoto();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NASA_OPEN_APIS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'mars_photo.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "camera": { "a": true, "h": "Camera", "n": "camera", "r": true, "t": "`$OBJECT`", "key$": "camera", "index$": 0 }, "earth_date": { "a": true, "fo": "date", "h": "Earth Date", "n": "earth_date", "r": true, "sh": "Earth date when the photo was taken", "t": "`$STRING`", "key$": "earth_date", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique identifier for the photo", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "img_src": { "a": true, "fo": "uri", "h": "Img Src", "n": "img_src", "r": true, "sh": "URL of the image", "t": "`$STRING`", "key$": "img_src", "index$": 3 }, "rover": { "a": true, "h": "Rover", "n": "rover", "r": true, "t": "`$OBJECT`", "key$": "rover", "index$": 4 }, "sol": { "a": true, "h": "Sol", "n": "sol", "r": true, "sh": "Martian sol when the photo was taken", "t": "`$INTEGER`", "key$": "sol", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "mars_photo", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /mars-photos/api/v1/rovers/{rover}/photos", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "rover_id", "or": "rover", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "DEMO_KEY", "k": "query", "n": "api_key", "or": "api_key", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "camera", "or": "camera", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "earth_date", "or": "earth_date", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "sol", "or": "sol", "r": false, "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/mars-photos/api/v1/rovers/{rover}/photos", "q": { "exist": ["api_key", "camera", "earth_date", "page", "rover_id", "sol"] }, "r": { "param": { "rover": "rover_id" } }, "s": [{ "lit": "mars-photos" }, { "lit": "api" }, { "lit": "v1" }, { "lit": "rovers" }, { "var": "rover_id" }, { "lit": "photos" }], "t": { "req": "`reqdata`", "res": "`body.photos`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "mars_photo", "name__orig": "mars_photo", "Name": "MarsPhoto", "name_": "mars_photo", "name-": "mars-photo", "NAME": "MARS_PHOTO", "index$": 0 }, { "active": true, "entity": "mars_photo", "key$": "BasicMarsPhotoFlow", "kind": "basic", "name": "BasicMarsPhotoFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "rover_id": "rover01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "mars_photo_ref01" } }], "index$": 0 }] }, 'MarsPhoto', { "GET /mars-photos/api/v1/rovers/{rover}/photos": { "protocol": "http", "operationId": "getMarsRoverPhotos", "responses": { "200": { "description": "Successful response with Mars rover photos", "content": { "application/json": { "schema": { "type": "object", "properties": { "photos": { "items": { "properties": { "camera": { "properties": { "full_name": { "description": "Full camera name", "type": "string" }, "id": { "description": "Camera identifier", "type": "integer" }, "name": { "description": "Camera abbreviation", "type": "string" }, "rover_id": { "description": "Rover identifier", "type": "integer" } }, "required": ["id", "name", "rover_id", "full_name"], "type": "object", "x-ref": "#/components/schemas/Camera", "key$": "camera" }, "earth_date": { "description": "Earth date when the photo was taken", "format": "date", "type": "string", "key$": "earth_date" }, "id": { "description": "Unique identifier for the photo", "type": "integer", "key$": "id" }, "img_src": { "description": "URL of the image", "format": "uri", "type": "string", "key$": "img_src" }, "rover": { "properties": { "cameras": { "description": "List of cameras on the rover", "items": { "properties": { "full_name": { "type": "string" }, "name": { "type": "string" } }, "type": "object" }, "type": "array" }, "id": { "description": "Rover identifier", "type": "integer" }, "landing_date": { "description": "Date when the rover landed on Mars", "format": "date", "type": "string" }, "launch_date": { "description": "Date when the rover was launched from Earth", "format": "date", "type": "string" }, "max_date": { "description": "Maximum Earth date for which photos are available", "format": "date", "type": "string" }, "max_sol": { "description": "Maximum sol for which photos are available", "type": "integer" }, "name": { "description": "Rover name", "type": "string" }, "status": { "description": "Current status of the rover", "enum": ["active", "complete"], "type": "string" }, "total_photos": { "description": "Total number of photos taken by the rover", "type": "integer" } }, "required": ["id", "name", "landing_date", "launch_date", "status"], "type": "object", "x-ref": "#/components/schemas/Rover", "key$": "rover" }, "sol": { "description": "Martian sol when the photo was taken", "type": "integer", "key$": "sol" } }, "required": ["id", "sol", "camera", "img_src", "earth_date", "rover"], "type": "object", "x-ref": "#/components/schemas/MarsPhoto", "index$": 0 }, "key$": "photos", "type": "array" } }, "required": ["photos"], "x-ref": "#/components/schemas/MarsPhotosResponse" } } } }, "400": { "description": "Bad request - invalid parameters" }, "403": { "description": "Forbidden - invalid API key" }, "404": { "description": "Not found - rover or photos not found" }, "429": { "description": "Rate limit exceeded" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "rover", "in": "path", "description": "The Mars rover name (curiosity, opportunity, or spirit)", "required": true, "schema": { "type": "string", "enum": ["curiosity", "opportunity", "spirit"] }, "index$": 0 }, { "name": "api_key", "in": "query", "description": "API key for authentication. Use DEMO_KEY for limited demo access.", "required": true, "schema": { "type": "string", "default": "DEMO_KEY" }, "index$": 1 }, { "name": "sol", "in": "query", "description": "Martian sol (day) on which photos were taken. Either sol or earth_date must be provided.", "required": false, "schema": { "type": "integer", "minimum": 0 }, "index$": 2 }, { "name": "earth_date", "in": "query", "description": "Earth date when photos were taken (YYYY-MM-DD format). Either sol or earth_date must be provided.", "required": false, "schema": { "type": "string", "format": "date" }, "index$": 3 }, { "name": "camera", "in": "query", "description": "Filter results by camera abbreviation (e.g., FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM, PANCAM, MINITES)", "required": false, "schema": { "type": "string" }, "index$": 4 }, { "name": "page", "in": "query", "description": "Page number for paginated results", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 5 }], "security": [{ "apiKey": [] }], "securitySource": "definition", "securitySchemes": { "apiKey": { "type": "apiKey", "name": "api_key", "in": "query", "description": "API key for NASA Open APIs. Register at https://api.nasa.gov to get your key, or use DEMO_KEY for limited testing." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let mars_photo_ref01_data = Object.values(setup.data.existing.mars_photo)[0];
        // LIST
        const mars_photo_ref01_ent = client.MarsPhoto();
        const mars_photo_ref01_match = {};
        mars_photo_ref01_match['rover_id'] = setup.idmap['rover01'];
        const mars_photo_ref01_list = (await mars_photo_ref01_ent.list(mars_photo_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/mars_photo/MarsPhotoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NasaOpenApisSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['mars_photo01', 'mars_photo02', 'mars_photo03', 'rover01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID': idmap,
        'NASA_OPEN_APIS_TEST_LIVE': 'FALSE',
        'NASA_OPEN_APIS_TEST_EXPLAIN': 'FALSE',
        'NASA_OPEN_APIS_APIKEY': '',
    });
    idmap = env['NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID'];
    const live = 'TRUE' === env.NASA_OPEN_APIS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NasaOpenApisSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.NASA_OPEN_APIS_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NASA_OPEN_APIS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=MarsPhotoEntity.test.js.map