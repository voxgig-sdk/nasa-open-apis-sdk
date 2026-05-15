
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.nasa.gov',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      mars_photo: {
      },

      planetary: {
      },

    }
  }


  entity = {
    "mars_photo": {
      "fields": [
        {
          "name": "camera",
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "earth_date",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "img_src",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "rover",
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 4
        },
        {
          "name": "sol",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        }
      ],
      "name": "mars_photo",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "rover_id",
                    "orig": "rover",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "DEMO_KEY",
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "camera",
                    "orig": "camera",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "earth_date",
                    "orig": "earth_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "sol",
                    "orig": "sol",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/mars-photos/api/v1/rovers/{rover}/photos",
              "parts": [
                "mars-photos",
                "api",
                "v1",
                "rovers",
                "{rover_id}",
                "photos"
              ],
              "rename": {
                "param": {
                  "rover": "rover_id"
                }
              },
              "select": {
                "exist": [
                  "api_key",
                  "camera",
                  "earth_date",
                  "page",
                  "rover_id",
                  "sol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": [
          [
            "rover"
          ]
        ]
      }
    },
    "planetary": {
      "fields": [],
      "name": "planetary",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "DEMO_KEY",
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "thumb",
                    "orig": "thumb",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/planetary/apod",
              "parts": [
                "planetary",
                "apod"
              ],
              "select": {
                "$action": "apod",
                "exist": [
                  "api_key",
                  "count",
                  "date",
                  "end_date",
                  "start_date",
                  "thumb"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

