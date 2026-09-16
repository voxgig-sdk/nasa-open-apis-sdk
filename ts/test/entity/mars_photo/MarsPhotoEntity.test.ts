

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


describe('MarsPhotoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NASA_OPEN_APIS_TEST_LIVE=TRUE.
  afterEach(liveDelay('NASA_OPEN_APIS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NasaOpenApisSDK.test()
    const ent = testsdk.MarsPhoto()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NASA_OPEN_APIS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mars_photo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"camera","req":true,"type":"`$OBJECT`","index$":0},{"active":true,"format":"date","name":"earth_date","req":true,"short":"Earth date when the photo was taken","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":true,"short":"Unique identifier for the photo","type":"`$INTEGER`","index$":2},{"active":true,"format":"uri","name":"img_src","req":true,"short":"URL of the image","type":"`$STRING`","index$":3},{"active":true,"name":"rover","req":true,"type":"`$OBJECT`","index$":4},{"active":true,"name":"sol","req":true,"short":"Martian sol when the photo was taken","type":"`$INTEGER`","index$":5}],"id":{"field":"id","name":"id"},"name":"mars_photo","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"rover_id","orig":"rover","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"DEMO_KEY","kind":"query","name":"api_key","orig":"api_key","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"camera","orig":"camera","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"earth_date","orig":"earth_date","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"kind":"query","name":"sol","orig":"sol","reqd":false,"type":"`$INTEGER`","index$":4}]},"contract":{"id":"GET /mars-photos/api/v1/rovers/{rover}/photos","json":"{\"operationId\":\"getMarsRoverPhotos\",\"parameters\":[{\"description\":\"The Mars rover name (curiosity, opportunity, or spirit)\",\"in\":\"path\",\"name\":\"rover\",\"required\":true,\"schema\":{\"enum\":[\"curiosity\",\"opportunity\",\"spirit\"],\"type\":\"string\"}},{\"description\":\"API key for authentication. Use DEMO_KEY for limited demo access.\",\"in\":\"query\",\"name\":\"api_key\",\"required\":true,\"schema\":{\"default\":\"DEMO_KEY\",\"type\":\"string\"}},{\"description\":\"Martian sol (day) on which photos were taken. Either sol or earth_date must be provided.\",\"in\":\"query\",\"name\":\"sol\",\"required\":false,\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Earth date when photos were taken (YYYY-MM-DD format). Either sol or earth_date must be provided.\",\"in\":\"query\",\"name\":\"earth_date\",\"required\":false,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Filter results by camera abbreviation (e.g., FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM, PANCAM, MINITES)\",\"in\":\"query\",\"name\":\"camera\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number for paginated results\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"photos\":{\"items\":{\"properties\":{\"camera\":{\"properties\":{\"full_name\":{\"description\":\"Full camera name\",\"type\":\"string\"},\"id\":{\"description\":\"Camera identifier\",\"type\":\"integer\"},\"name\":{\"description\":\"Camera abbreviation\",\"type\":\"string\"},\"rover_id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"}},\"required\":[\"id\",\"name\",\"rover_id\",\"full_name\"],\"type\":\"object\"},\"earth_date\":{\"description\":\"Earth date when the photo was taken\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the photo\",\"type\":\"integer\"},\"img_src\":{\"description\":\"URL of the image\",\"format\":\"uri\",\"type\":\"string\"},\"rover\":{\"properties\":{\"cameras\":{\"description\":\"List of cameras on the rover\",\"items\":{\"properties\":{\"full_name\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"},\"landing_date\":{\"description\":\"Date when the rover landed on Mars\",\"format\":\"date\",\"type\":\"string\"},\"launch_date\":{\"description\":\"Date when the rover was launched from Earth\",\"format\":\"date\",\"type\":\"string\"},\"max_date\":{\"description\":\"Maximum Earth date for which photos are available\",\"format\":\"date\",\"type\":\"string\"},\"max_sol\":{\"description\":\"Maximum sol for which photos are available\",\"type\":\"integer\"},\"name\":{\"description\":\"Rover name\",\"type\":\"string\"},\"status\":{\"description\":\"Current status of the rover\",\"enum\":[\"active\",\"complete\"],\"type\":\"string\"},\"total_photos\":{\"description\":\"Total number of photos taken by the rover\",\"type\":\"integer\"}},\"required\":[\"id\",\"name\",\"landing_date\",\"launch_date\",\"status\"],\"type\":\"object\"},\"sol\":{\"description\":\"Martian sol when the photo was taken\",\"type\":\"integer\"}},\"required\":[\"id\",\"sol\",\"camera\",\"img_src\",\"earth_date\",\"rover\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"photos\"],\"type\":\"object\"}}},\"description\":\"Successful response with Mars rover photos\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"403\":{\"description\":\"Forbidden - invalid API key\"},\"404\":{\"description\":\"Not found - rover or photos not found\"},\"429\":{\"description\":\"Rate limit exceeded\"},\"500\":{\"description\":\"Internal server error\"}},\"security\":[{\"apiKey\":[]}],\"securitySchemes\":{\"apiKey\":{\"description\":\"API key for NASA Open APIs. Register at https://api.nasa.gov to get your key, or use DEMO_KEY for limited testing.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/mars-photos/api/v1/rovers/{rover}/photos","rename":{"param":{"rover":"rover_id"}},"segments":[{"lit":"mars-photos"},{"lit":"api"},{"lit":"v1"},{"lit":"rovers"},{"var":"rover_id"},{"lit":"photos"}],"select":{"exist":["api_key","camera","earth_date","page","rover_id","sol"]},"transform":{"req":"`reqdata`","res":"`body.photos`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["rover"]]},"key$":"mars_photo","name__orig":"mars_photo","Name":"MarsPhoto","name_":"mars_photo","name-":"mars-photo","NAME":"MARS_PHOTO","index$":0}, {"active":true,"entity":"mars_photo","key$":"BasicMarsPhotoFlow","kind":"basic","name":"BasicMarsPhotoFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"rover_id":"rover01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"mars_photo_ref01"}}],"index$":0}]}, 'MarsPhoto')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mars_photo_ref01_data = Object.values(setup.data.existing.mars_photo)[0] as any

    // LIST
    const mars_photo_ref01_ent = client.MarsPhoto()
    const mars_photo_ref01_match: any = {}
    mars_photo_ref01_match['rover_id'] = setup.idmap['rover01']

    const mars_photo_ref01_list = (await mars_photo_ref01_ent.list(mars_photo_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mars_photo/MarsPhotoTestData.json')

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
    ['mars_photo01','mars_photo02','mars_photo03','rover01','rover02','rover03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID': idmap,
    'NASA_OPEN_APIS_TEST_LIVE': 'FALSE',
    'NASA_OPEN_APIS_TEST_EXPLAIN': 'FALSE',
    'NASA_OPEN_APIS_APIKEY': '',
  })

  idmap = env['NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID']

  const live = 'TRUE' === env.NASA_OPEN_APIS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NASA_OPEN_APIS_TEST_MARS_PHOTO_ENTID']
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
  
