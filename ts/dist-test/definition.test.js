"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "mars_photo",
        "accessor": "MarsPhoto",
        "op": "list",
        "method": "GET",
        "path": "/mars-photos/api/v1/rovers/{rover}/photos",
        "args": [
            {
                "name": "rover_id",
                "wire": "rover",
                "value": "p1"
            }
        ],
        "select": {
            "api_key": "v1",
            "camera": "v1",
            "earth_date": "v1",
            "page": "v1",
            "sol": "v1"
        },
        "headers": [],
        "query": [
            "api_key",
            "sol",
            "earth_date",
            "camera",
            "page"
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "photos": [
                {
                    "camera": {
                        "full_name": "x",
                        "id": 1,
                        "name": "x",
                        "rover_id": 1
                    },
                    "earth_date": "2026-01-01",
                    "id": 1,
                    "img_src": "x",
                    "rover": {
                        "cameras": [
                            {
                                "full_name": "x",
                                "name": "x"
                            }
                        ],
                        "id": 1,
                        "landing_date": "2026-01-01",
                        "launch_date": "2026-01-01",
                        "max_date": "2026-01-01",
                        "max_sol": 1,
                        "name": "x",
                        "status": "active",
                        "total_photos": 1
                    },
                    "sol": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "planetary",
        "accessor": "Planetary",
        "op": "load",
        "method": "GET",
        "path": "/planetary/apod",
        "action": "apod",
        "args": [],
        "select": {
            "api_key": "v1",
            "count": "v1",
            "date": "v1",
            "end_date": "v1",
            "start_date": "v1",
            "thumb": "v1"
        },
        "headers": [],
        "query": [
            "api_key",
            "date",
            "start_date",
            "end_date",
            "count",
            "thumbs"
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "api_key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "copyright": "x",
            "date": "2026-01-01",
            "explanation": "x",
            "hdurl": "x",
            "media_type": "image",
            "service_version": "x",
            "title": "x",
            "url": "x",
            "thumbnail_url": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map