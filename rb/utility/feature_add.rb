# NasaOpenApis SDK utility: feature_add
module NasaOpenApisUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
