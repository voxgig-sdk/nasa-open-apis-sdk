package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMarsPhotoEntityFunc func(client *NasaOpenApisSDK, entopts map[string]any) NasaOpenApisEntity

var NewPlanetaryEntityFunc func(client *NasaOpenApisSDK, entopts map[string]any) NasaOpenApisEntity

