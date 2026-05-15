# NasaOpenApis SDK exists test

require "minitest/autorun"
require_relative "../NasaOpenApis_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NasaOpenApisSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
