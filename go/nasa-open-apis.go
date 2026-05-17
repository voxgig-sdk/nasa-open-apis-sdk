package voxgignasaopenapissdk

import (
	"github.com/voxgig-sdk/nasa-open-apis-sdk/go/core"
	"github.com/voxgig-sdk/nasa-open-apis-sdk/go/entity"
	"github.com/voxgig-sdk/nasa-open-apis-sdk/go/feature"
	_ "github.com/voxgig-sdk/nasa-open-apis-sdk/go/utility"
)

// Type aliases preserve external API.
type NasaOpenApisSDK = core.NasaOpenApisSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NasaOpenApisEntity = core.NasaOpenApisEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NasaOpenApisError = core.NasaOpenApisError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewMarsPhotoEntityFunc = func(client *core.NasaOpenApisSDK, entopts map[string]any) core.NasaOpenApisEntity {
		return entity.NewMarsPhotoEntity(client, entopts)
	}
	core.NewPlanetaryEntityFunc = func(client *core.NasaOpenApisSDK, entopts map[string]any) core.NasaOpenApisEntity {
		return entity.NewPlanetaryEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNasaOpenApisSDK = core.NewNasaOpenApisSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
