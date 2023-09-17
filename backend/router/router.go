package router

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/julianstephens/boulder-buddy/backend/handlers"
	"github.com/julianstephens/boulder-buddy/backend/middleware"
	"github.com/julianstephens/boulder-buddy/backend/models"
)

type Response models.Response

// Healthcheck
// @Summary Healthcheck
// @Description retrieve server status
// @Success 200 {object} Response
// @Router / [get]
func Healthcheck(c *fiber.Ctx) error {
	return c.Status(http.StatusOK).JSON(Response{Message: "API Healthy!"})
}

func Initalize(router *fiber.App) {
	router.Use(middleware.Security)
	router.Use(middleware.Json)

	v1 := router.Group("/api/v1")
	{
		v1.Get("/", Healthcheck)

		mesos := v1.Group("/mesos", middleware.Authenticate)
		{
			mesos.Get("/", handlers.GetMesos)
			mesos.Post("/", handlers.CreateMeso)
		}
	}

	router.Use(func(c *fiber.Ctx) error {
		return c.Status(http.StatusNotFound).JSON(Response{
			Message: "Not Found",
		})
	})
}
