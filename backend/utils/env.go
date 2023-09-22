package utils

import (
	"github.com/caarlos0/env/v9"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2/log"
)

type Config struct {
	AwsRegion     string `env:"AWS_COGNITO_REGION" validate:"required"`
	CognitoPool   string `env:"AWS_COGNITO_POOL_ID" validate:"required"`
	CognitoDomain string `env:"AWS_COGNITO_DOMAIN" validate:"required"`
	DatabaseURI   string `env:"DATABASE_URL" validate:"required"`
	AppPort       int    `env:"API_PORT" envDefault:"8000" validate:"required"`
}

// Parse parses, validates and then returns the application
// configuration based on ENV variables
func Parse(val *validator.Validate) (cfg *Config, err error) {

	log.Info("Parsing ENV vars...")
	defer log.Info("Done Parsing ENV vars")

	cfg = &Config{}

	if err = env.Parse(cfg); err != nil {
		log.Errorf("Errors Parsing Configuration", err)
	}

	err = val.Struct(cfg)

	return
}
