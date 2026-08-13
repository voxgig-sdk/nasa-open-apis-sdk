# NasaOpenApis SDK utility: make_context

from nasaopenapis_sdk.core.context import NasaOpenApisContext


def make_context_util(ctxmap, basectx):
    return NasaOpenApisContext(ctxmap, basectx)
