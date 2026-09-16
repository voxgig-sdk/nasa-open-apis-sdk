package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewMarsPhotoEntityFunc func(client *NasaOpenApisSDK, entopts map[string]any) NasaOpenApisEntity

var NewPlanetaryEntityFunc func(client *NasaOpenApisSDK, entopts map[string]any) NasaOpenApisEntity

