package core

type NasaOpenApisError struct {
	IsNasaOpenApisError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNasaOpenApisError(code string, msg string, ctx *Context) *NasaOpenApisError {
	return &NasaOpenApisError{
		IsNasaOpenApisError: true,
		Sdk:              "NasaOpenApis",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NasaOpenApisError) Error() string {
	return e.Msg
}
