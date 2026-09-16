

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NasaOpenApisSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PlanetaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NASA_OPEN_APIS_TEST_LIVE=TRUE.
  afterEach(liveDelay('NASA_OPEN_APIS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NasaOpenApisSDK.test()
    const ent = testsdk.Planetary()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NASA_OPEN_APIS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'planetary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"planetary","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"DEMO_KEY","kind":"query","name":"api_key","orig":"api_key","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"date","orig":"date","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":false,"kind":"query","name":"thumb","orig":"thumb","reqd":false,"type":"`$BOOLEAN`","index$":5}]},"contract":{"id":"GET /planetary/apod","json":"{\"operationId\":\"getApod\",\"parameters\":[{\"description\":\"API key for authentication. Use DEMO_KEY for limited demo access.\",\"in\":\"query\",\"name\":\"api_key\",\"required\":true,\"schema\":{\"default\":\"DEMO_KEY\",\"type\":\"string\"}},{\"description\":\"The date of the APOD image to retrieve (YYYY-MM-DD format). Defaults to today's date.\",\"in\":\"query\",\"name\":\"date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The start date for a range of dates (YYYY-MM-DD format). Used with end_date.\",\"in\":\"query\",\"name\":\"start_date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The end date for a range of dates (YYYY-MM-DD format). Used with start_date.\",\"in\":\"query\",\"name\":\"end_date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Number of randomly selected images to return. Cannot be used with date or start_date/end_date.\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Return the URL of video thumbnail if the media type is video.\",\"in\":\"query\",\"name\":\"thumbs\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"copyright\":{\"description\":\"The name of the copyright holder\",\"type\":\"string\"},\"date\":{\"description\":\"The date of the APOD image\",\"format\":\"date\",\"type\":\"string\"},\"explanation\":{\"description\":\"The explanation of the image written by an astronomer\",\"type\":\"string\"},\"hdurl\":{\"description\":\"The URL for the high-resolution image\",\"format\":\"uri\",\"type\":\"string\"},\"media_type\":{\"description\":\"The type of media (image or video)\",\"enum\":[\"image\",\"video\"],\"type\":\"string\"},\"service_version\":{\"description\":\"The version of the APOD API service\",\"type\":\"string\"},\"thumbnail_url\":{\"description\":\"The URL of the video thumbnail (only present if media_type is video and thumbs parameter is true)\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the image\",\"type\":\"string\"},\"url\":{\"description\":\"The URL of the APOD image or video\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"date\",\"explanation\",\"media_type\",\"title\",\"url\"],\"type\":\"object\"},{\"items\":{\"properties\":{\"copyright\":{\"description\":\"The name of the copyright holder\",\"type\":\"string\"},\"date\":{\"description\":\"The date of the APOD image\",\"format\":\"date\",\"type\":\"string\"},\"explanation\":{\"description\":\"The explanation of the image written by an astronomer\",\"type\":\"string\"},\"hdurl\":{\"description\":\"The URL for the high-resolution image\",\"format\":\"uri\",\"type\":\"string\"},\"media_type\":{\"description\":\"The type of media (image or video)\",\"enum\":[\"image\",\"video\"],\"type\":\"string\"},\"service_version\":{\"description\":\"The version of the APOD API service\",\"type\":\"string\"},\"thumbnail_url\":{\"description\":\"The URL of the video thumbnail (only present if media_type is video and thumbs parameter is true)\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the image\",\"type\":\"string\"},\"url\":{\"description\":\"The URL of the APOD image or video\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"date\",\"explanation\",\"media_type\",\"title\",\"url\"],\"type\":\"object\"},\"type\":\"array\"}]}}},\"description\":\"Successful response with APOD data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"403\":{\"description\":\"Forbidden - invalid API key\"},\"404\":{\"description\":\"Not found - no APOD for specified date\"},\"429\":{\"description\":\"Rate limit exceeded\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for NASA Open APIs. Register at https://api.nasa.gov to get your key, or use DEMO_KEY for limited testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/planetary/apod","segments":[{"lit":"planetary"},{"lit":"apod"}],"select":{"$action":"apod","exist":["api_key","count","date","end_date","start_date","thumb"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"planetary","name__orig":"planetary","Name":"Planetary","name_":"planetary","name-":"planetary","NAME":"PLANETARY","index$":1}, {"active":true,"entity":"planetary","key$":"BasicPlanetaryFlow","kind":"basic","name":"BasicPlanetaryFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"planetary_ref01","srcdatavar":"planetary_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-planetary_ref01"}}],"index$":0}]}, 'Planetary')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let planetary_ref01_data = Object.values(setup.data.existing.planetary)[0] as any

    // LOAD
    const planetary_ref01_ent = client.Planetary()
    const planetary_ref01_match_dt0: any = {}
    const planetary_ref01_data_dt0 = (await planetary_ref01_ent.load(planetary_ref01_match_dt0)).data()
    assert(null != planetary_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/planetary/PlanetaryTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NasaOpenApisSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['planetary01','planetary02','planetary03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NASA_OPEN_APIS_TEST_PLANETARY_ENTID': idmap,
    'NASA_OPEN_APIS_TEST_LIVE': 'FALSE',
    'NASA_OPEN_APIS_TEST_EXPLAIN': 'FALSE',
    'NASA_OPEN_APIS_APIKEY': '',
  })

  idmap = env['NASA_OPEN_APIS_TEST_PLANETARY_ENTID']

  const live = 'TRUE' === env.NASA_OPEN_APIS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NASA_OPEN_APIS_TEST_PLANETARY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NasaOpenApisSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
