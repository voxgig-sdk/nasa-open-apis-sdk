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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PlanetaryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NASA_OPEN_APIS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NASA_OPEN_APIS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NasaOpenApisSDK.test();
        const ent = testsdk.Planetary();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NASA_OPEN_APIS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'planetary.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "planetary", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "DEMO_KEY", "kind": "query", "name": "api_key", "orig": "api_key", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "date", "orig": "date", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "end_date", "orig": "end_date", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "start_date", "orig": "start_date", "reqd": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "example": false, "kind": "query", "name": "thumb", "orig": "thumb", "reqd": false, "type": "`$BOOLEAN`", "index$": 5 }] }, "contract": { "id": "GET /planetary/apod", "json": "{\"operationId\":\"getApod\",\"parameters\":[{\"description\":\"API key for authentication. Use DEMO_KEY for limited demo access.\",\"in\":\"query\",\"name\":\"api_key\",\"required\":true,\"schema\":{\"default\":\"DEMO_KEY\",\"type\":\"string\"}},{\"description\":\"The date of the APOD image to retrieve (YYYY-MM-DD format). Defaults to today's date.\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The start date for a range of dates (YYYY-MM-DD format). Used with end_date.\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The end date for a range of dates (YYYY-MM-DD format). Used with start_date.\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Number of randomly selected images to return. Cannot be used with date or start_date/end_date.\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Return the URL of video thumbnail if the media type is video.\",\"in\":\"query\",\"name\":\"thumbs\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"copyright\":{\"description\":\"The name of the copyright holder\",\"type\":\"string\"},\"date\":{\"description\":\"The date of the APOD image\",\"format\":\"date\",\"type\":\"string\"},\"explanation\":{\"description\":\"The explanation of the image written by an astronomer\",\"type\":\"string\"},\"hdurl\":{\"description\":\"The URL for the high-resolution image\",\"format\":\"uri\",\"type\":\"string\"},\"media_type\":{\"description\":\"The type of media (image or video)\",\"enum\":[\"image\",\"video\"],\"type\":\"string\"},\"service_version\":{\"description\":\"The version of the APOD API service\",\"type\":\"string\"},\"thumbnail_url\":{\"description\":\"The URL of the video thumbnail (only present if media_type is video and thumbs parameter is true)\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the image\",\"type\":\"string\"},\"url\":{\"description\":\"The URL of the APOD image or video\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"date\",\"explanation\",\"media_type\",\"title\",\"url\"],\"type\":\"object\"},{\"items\":{\"properties\":{\"copyright\":{\"description\":\"The name of the copyright holder\",\"type\":\"string\"},\"date\":{\"description\":\"The date of the APOD image\",\"format\":\"date\",\"type\":\"string\"},\"explanation\":{\"description\":\"The explanation of the image written by an astronomer\",\"type\":\"string\"},\"hdurl\":{\"description\":\"The URL for the high-resolution image\",\"format\":\"uri\",\"type\":\"string\"},\"media_type\":{\"description\":\"The type of media (image or video)\",\"enum\":[\"image\",\"video\"],\"type\":\"string\"},\"service_version\":{\"description\":\"The version of the APOD API service\",\"type\":\"string\"},\"thumbnail_url\":{\"description\":\"The URL of the video thumbnail (only present if media_type is video and thumbs parameter is true)\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the image\",\"type\":\"string\"},\"url\":{\"description\":\"The URL of the APOD image or video\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"date\",\"explanation\",\"media_type\",\"title\",\"url\"],\"type\":\"object\"},\"type\":\"array\"}]}}},\"description\":\"Successful response with APOD data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"403\":{\"description\":\"Forbidden - invalid API key\"},\"404\":{\"description\":\"Not found - no APOD for specified date\"},\"429\":{\"description\":\"Rate limit exceeded\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for NASA Open APIs. Register at https://api.nasa.gov to get your key, or use DEMO_KEY for limited testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/planetary/apod", "segments": [{ "lit": "planetary" }, { "lit": "apod" }], "select": { "$action": "apod", "exist": ["api_key", "count", "date", "end_date", "start_date", "thumb"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "planetary", "name__orig": "planetary", "Name": "Planetary", "name_": "planetary", "name-": "planetary", "NAME": "PLANETARY", "index$": 1 }, { "active": true, "entity": "planetary", "key$": "BasicPlanetaryFlow", "kind": "basic", "name": "BasicPlanetaryFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "planetary_ref01", "srcdatavar": "planetary_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-planetary_ref01" } }], "index$": 0 }] }, 'Planetary');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let planetary_ref01_data = Object.values(setup.data.existing.planetary)[0];
        // LOAD
        const planetary_ref01_ent = client.Planetary();
        const planetary_ref01_match_dt0 = {};
        const planetary_ref01_data_dt0 = (await planetary_ref01_ent.load(planetary_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != planetary_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/planetary/PlanetaryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NasaOpenApisSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['planetary01', 'planetary02', 'planetary03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NASA_OPEN_APIS_TEST_PLANETARY_ENTID': idmap,
        'NASA_OPEN_APIS_TEST_LIVE': 'FALSE',
        'NASA_OPEN_APIS_TEST_EXPLAIN': 'FALSE',
        'NASA_OPEN_APIS_APIKEY': '',
    });
    idmap = env['NASA_OPEN_APIS_TEST_PLANETARY_ENTID'];
    const live = 'TRUE' === env.NASA_OPEN_APIS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NASA_OPEN_APIS_TEST_PLANETARY_ENTID'];
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
//# sourceMappingURL=PlanetaryEntity.test.js.map