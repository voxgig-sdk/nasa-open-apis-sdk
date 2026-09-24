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
			"slug": "nasa-open-apis",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.nasa.gov",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "api_key",
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
						"title": "Camera",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "earth_date",
						"title": "Earth Date",
						"type": "`$STRING`",
						"req": true,
						"short": "Earth date when the photo was taken",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Unique identifier for the photo",
					},
					map[string]any{
						"name": "img_src",
						"title": "Img Src",
						"type": "`$STRING`",
						"req": true,
						"short": "URL of the image",
						"format": "uri",
					},
					map[string]any{
						"name": "rover",
						"title": "Rover",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "sol",
						"title": "Sol",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Martian sol when the photo was taken",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "mars_photo",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mars-photos/api/v1/rovers/{rover}/photos",
								"segments": []any{
									map[string]any{
										"lit": "mars-photos",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "rovers",
									},
									map[string]any{
										"var": "rover_id",
									},
									map[string]any{
										"lit": "photos",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.photos`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "rover_id",
											"orig": "rover",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "DEMO_KEY",
										},
										map[string]any{
											"name": "camera",
											"orig": "camera",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "earth_date",
											"orig": "earth_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "sol",
											"orig": "sol",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/planetary/apod",
								"segments": []any{
									map[string]any{
										"lit": "planetary",
									},
									map[string]any{
										"lit": "apod",
									},
								},
								"parts": []any{
									"planetary",
									"apod",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "api_key",
											"orig": "api_key",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "DEMO_KEY",
										},
										map[string]any{
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "thumb",
											"orig": "thumb",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
