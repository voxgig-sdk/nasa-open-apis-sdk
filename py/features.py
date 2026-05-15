# NasaOpenApis SDK feature factory

from feature.base_feature import NasaOpenApisBaseFeature
from feature.test_feature import NasaOpenApisTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NasaOpenApisBaseFeature(),
        "test": lambda: NasaOpenApisTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
