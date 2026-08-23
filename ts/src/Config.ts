
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NasaOpenApis',
        slug: "nasa-open-apis",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.nasa.gov",

    auth: {
      prefix: '',
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
          "type": "`$OBJECT`"
        },
        {
          "name": "earth_date",
          "req": true,
          "short": "Earth date when the photo was taken",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Unique identifier for the photo",
          "type": "`$INTEGER`"
        },
        {
          "name": "img_src",
          "req": true,
          "short": "URL of the image",
          "type": "`$STRING`"
        },
        {
          "name": "rover",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "sol",
          "req": true,
          "short": "Martian sol when the photo was taken",
          "type": "`$INTEGER`"
        }
      ],
      "name": "mars_photo",
      "op": {
        "list": {
          "input": "data",
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
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "DEMO_KEY",
                    "kind": "query",
                    "name": "api_key",
                    "orig": "api_key",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "camera",
                    "orig": "camera",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "earth_date",
                    "orig": "earth_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "sol",
                    "orig": "sol",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
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
                "res": "`body.photos`"
              }
            }
          ]
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
          "input": "data",
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "count",
                    "orig": "count",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "thumb",
                    "orig": "thumb",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
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
              }
            }
          ]
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

