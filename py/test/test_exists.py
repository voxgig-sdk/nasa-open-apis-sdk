# ProjectName SDK exists test

import pytest
from nasaopenapis_sdk import NasaOpenApisSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NasaOpenApisSDK.test(None, None)
        assert testsdk is not None
