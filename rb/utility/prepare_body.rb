# NasaOpenApis SDK utility: prepare_body
require_relative 'media'
module NasaOpenApisUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NasaOpenApisUtilities.raw_body(ctx.reqdata) if NasaOpenApisUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
