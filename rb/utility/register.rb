# NasaOpenApis SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NasaOpenApisUtility.registrar = ->(u) {
  u.clean = NasaOpenApisUtilities::Clean
  u.done = NasaOpenApisUtilities::Done
  u.make_error = NasaOpenApisUtilities::MakeError
  u.feature_add = NasaOpenApisUtilities::FeatureAdd
  u.feature_hook = NasaOpenApisUtilities::FeatureHook
  u.feature_init = NasaOpenApisUtilities::FeatureInit
  u.fetcher = NasaOpenApisUtilities::Fetcher
  u.make_fetch_def = NasaOpenApisUtilities::MakeFetchDef
  u.make_context = NasaOpenApisUtilities::MakeContext
  u.make_options = NasaOpenApisUtilities::MakeOptions
  u.make_request = NasaOpenApisUtilities::MakeRequest
  u.make_response = NasaOpenApisUtilities::MakeResponse
  u.make_result = NasaOpenApisUtilities::MakeResult
  u.make_point = NasaOpenApisUtilities::MakePoint
  u.make_spec = NasaOpenApisUtilities::MakeSpec
  u.make_url = NasaOpenApisUtilities::MakeUrl
  u.param = NasaOpenApisUtilities::Param
  u.prepare_auth = NasaOpenApisUtilities::PrepareAuth
  u.prepare_body = NasaOpenApisUtilities::PrepareBody
  u.prepare_headers = NasaOpenApisUtilities::PrepareHeaders
  u.prepare_method = NasaOpenApisUtilities::PrepareMethod
  u.prepare_params = NasaOpenApisUtilities::PrepareParams
  u.prepare_path = NasaOpenApisUtilities::PreparePath
  u.prepare_query = NasaOpenApisUtilities::PrepareQuery
  u.graphql_body = NasaOpenApisUtilities::GraphqlBody
  u.graphql_errors = NasaOpenApisUtilities::GraphqlErrors
  u.result_basic = NasaOpenApisUtilities::ResultBasic
  u.result_body = NasaOpenApisUtilities::ResultBody
  u.result_headers = NasaOpenApisUtilities::ResultHeaders
  u.transform_request = NasaOpenApisUtilities::TransformRequest
  u.transform_response = NasaOpenApisUtilities::TransformResponse
}
