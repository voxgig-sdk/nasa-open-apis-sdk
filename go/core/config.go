package core

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
				"prefix": "Bearer",
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
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "earth_date",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "img_src",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "rover",
						"req": true,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "sol",
						"req": true,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
				},
				"name": "mars_photo",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
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
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "camera",
											"orig": "camera",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "earth_date",
											"orig": "earth_date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "sol",
											"orig": "sol",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "thumb",
											"orig": "thumb",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
