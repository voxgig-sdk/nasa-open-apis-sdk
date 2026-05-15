package = "voxgig-sdk-nasa-open-apis"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/nasa-open-apis-sdk.git"
}
description = {
  summary = "NasaOpenApis SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["nasa-open-apis_sdk"] = "nasa-open-apis_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
