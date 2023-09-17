package main

import (
	"github.com/joho/godotenv"
	"github.com/julianstephens/boulder-buddy/backend/database"
	_ "github.com/julianstephens/boulder-buddy/backend/docs"
	"github.com/julianstephens/boulder-buddy/backend/router"
	"github.com/julianstephens/boulder-buddy/backend/utils"

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/gofiber/swagger"
)

// @title Boulder Buddy API
// @version 1.0
// @host localhost:3500
// @BasePath /api/v1
// @schemes http
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Unable to load .env file")
	}

	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := utils.ErrCodeToHTTPStatus(err)
			log.Println(code)
			return c.Status(code).JSON(err)
		},
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))
	app.Use(requestid.New())
	app.Use(logger.New(logger.Config{
		Format:     "${time} | ${pid} | ${locals:requestid} | ${status} | ${method} | ${path}​\n",
		TimeFormat: "2006/01/02 15:04:05",
		TimeZone:   "Local",
	}))

	database.ConnectDB()

	port := utils.Getenv("API_PORT", "8000")

	app.Get("/docs/*", swagger.HandlerDefault)
	router.Initalize(app)
	log.Fatal(app.Listen(":" + utils.Getenv("PORT", port)))
}
