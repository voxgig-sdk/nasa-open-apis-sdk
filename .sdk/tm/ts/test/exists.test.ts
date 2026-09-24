
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NasaOpenApisSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NasaOpenApisSDK.test()
    equal(testsdk instanceof NasaOpenApisSDK, true,
      'NasaOpenApisSDK.test() must return a client synchronously')
  })

})
