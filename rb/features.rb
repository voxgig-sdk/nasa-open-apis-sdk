# NasaOpenApis SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NasaOpenApisFeatures
  def self.make_feature(name)
    case name
    when "base"
      NasaOpenApisBaseFeature.new
    when "ratelimit"
      NasaOpenApisRatelimitFeature.new
    when "retry"
      NasaOpenApisRetryFeature.new
    when "test"
      NasaOpenApisTestFeature.new
    when "timeout"
      NasaOpenApisTimeoutFeature.new
    else
      NasaOpenApisBaseFeature.new
    end
  end
end
