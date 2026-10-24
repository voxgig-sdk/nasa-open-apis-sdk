

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NasaOpenApisSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NasaOpenApisSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Planetary().load({"api_key":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NASA_OPEN_APIS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'planetary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"planetary","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /planetary/apod","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"DEMO_KEY","k":"query","n":"api_key","or":"api_key","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"count","or":"count","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"end_date","or":"end_date","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"start_date","or":"start_date","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":false,"k":"query","n":"thumb","or":"thumbs","r":false,"t":"`$BOOLEAN`","index$":5}]},"k":"http","m":"GET","o":"/planetary/apod","q":{"$action":"apod","exist":["api_key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"planetary"},{"lit":"apod"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"planetary","name__orig":"planetary","Name":"Planetary","name_":"planetary","name-":"planetary","NAME":"PLANETARY","index$":1}, {"active":true,"entity":"planetary","key$":"BasicPlanetaryFlow","kind":"basic","name":"BasicPlanetaryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"planetary_ref01","srcdatavar":"planetary_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-planetary_ref01"}}],"index$":0}]}, 'Planetary', {"GET /planetary/apod":{"protocol":"http","parameters":[{"name":"api_key","in":"query","description":"API key for authentication. Use DEMO_KEY for limited demo access.","required":true,"schema":{"type":"string","default":"DEMO_KEY"},"index$":0},{"name":"date","in":"query","description":"The date of the APOD image to retrieve (YYYY-MM-DD format). Defaults to today's date.","required":false,"schema":{"type":"string","format":"date"},"index$":1},{"name":"start_date","in":"query","description":"The start date for a range of dates (YYYY-MM-DD format). Used with end_date.","required":false,"schema":{"type":"string","format":"date"},"index$":2},{"name":"end_date","in":"query","description":"The end date for a range of dates (YYYY-MM-DD format). Used with start_date.","required":false,"schema":{"type":"string","format":"date"},"index$":3},{"name":"count","in":"query","description":"Number of randomly selected images to return. Cannot be used with date or start_date/end_date.","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":4},{"name":"thumbs","in":"query","description":"Return the URL of video thumbnail if the media type is video.","required":false,"schema":{"type":"boolean","default":false},"index$":5}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
