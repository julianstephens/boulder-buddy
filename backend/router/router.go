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

		auth := v1.Group("/auth")
		{
			auth.Post("/register", handlers.Register)
			auth.Post("/login", handlers.Login)
			auth.Delete("/logout", handlers.Logout)
			auth.Post("/me", middleware.Authenticate, handlers.GetUserInfo)
		}

		users := v1.Group("/users")
		{
			users.Delete("/", middleware.Authenticate, handlers.DeleteUser)
			users.Put("/", middleware.Authenticate, handlers.ChangePassword)
		}

		mesos := v1.Group("/mesos")
		{
			mesos.Get("/", middleware.Authenticate, handlers.GetMesos)
			mesos.Post("/", middleware.Authenticate, handlers.CreateMeso)

		}
	}

	router.Use(func(c *fiber.Ctx) error {
		return c.Status(http.StatusNotFound).JSON(Response{
			Message: "Not Found",
		})
	})
}
