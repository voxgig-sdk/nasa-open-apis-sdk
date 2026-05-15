# NasaOpenApis SDK utility: make_context
require_relative '../core/context'
module NasaOpenApisUtilities
  MakeContext = ->(ctxmap, basectx) {
    NasaOpenApisContext.new(ctxmap, basectx)
  }
end
