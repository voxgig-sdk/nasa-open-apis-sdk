package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "NasaOpenApis",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.nasa.gov",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"mars_photo": map[string]any{},
				"planetary": map[string]any{},
			},
		},
		"entity": map[string]any{
			"mars_photo": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "camera",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "earth_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "img_src",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rover",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sol",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "mars_photo",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "rover_id",
											"orig": "rover",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "DEMO_KEY",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "camera",
											"orig": "camera",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "earth_date",
											"orig": "earth_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sol",
											"orig": "sol",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/mars-photos/api/v1/rovers/{rover}/photos",
								"parts": []any{
									"mars-photos",
									"api",
									"v1",
									"rovers",
									"{rover_id}",
									"photos",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"rover": "rover_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"api_key",
										"camera",
										"earth_date",
										"page",
										"rover_id",
										"sol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.photos`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"rover",
						},
					},
				},
			},
			"planetary": map[string]any{
				"fields": []any{},
				"name": "planetary",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "DEMO_KEY",
											"kind": "query",
											"name": "api_key",
											"orig": "api_key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "thumb",
											"orig": "thumb",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/planetary/apod",
								"parts": []any{
									"planetary",
									"apod",
								},
								"select": map[string]any{
									"$action": "apod",
									"exist": []any{
										"api_key",
										"count",
										"date",
										"end_date",
										"start_date",
										"thumb",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
