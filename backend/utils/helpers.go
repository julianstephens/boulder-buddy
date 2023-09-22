package utils

import (
	"os"
	"regexp"

	"github.com/go-playground/validator/v10"
)

func Getenv(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}

func ExtractErrorData(errors validator.ValidationErrors) ([]string, []ValidationError) {
	var fields []string
	var errs []ValidationError

	for _, e := range errors {
		fields = append(fields, e.Field())
		errs = append(errs, ValidationError{
			Path:    e.Field(),
			Tag:     e.ActualTag(),
			Message: GenerateErrorMessage(e),
		})
	}

	return fields, errs
}

func RegSplit(text string, delimeter string) []string {
	reg := regexp.MustCompile(delimeter)
	indexes := reg.FindAllStringIndex(text, -1)
	result := make([]string, len(indexes))
	for i, element := range indexes {
		result[i] = text[element[0]:element[1]]
	}
	return result
}
