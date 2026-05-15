
import { Context } from './Context'


class NasaOpenApisError extends Error {

  isNasaOpenApisError = true

  sdk = 'NasaOpenApis'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NasaOpenApisError
}

