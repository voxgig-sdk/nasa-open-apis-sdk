# NasaOpenApis SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NasaOpenApisFeatures
  def self.make_feature(name)
    case name
    when "base"
      NasaOpenApisBaseFeature.new
    when "test"
      NasaOpenApisTestFeature.new
    else
      NasaOpenApisBaseFeature.new
    end
  end
end
