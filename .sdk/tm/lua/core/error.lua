-- NasaOpenApis SDK error

local NasaOpenApisError = {}
NasaOpenApisError.__index = NasaOpenApisError


function NasaOpenApisError.new(code, msg, ctx)
  local self = setmetatable({}, NasaOpenApisError)
  self.is_sdk_error = true
  self.sdk = "NasaOpenApis"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NasaOpenApisError:error()
  return self.msg
end


function NasaOpenApisError:__tostring()
  return self.msg
end


return NasaOpenApisError
