package handlers

import (
	"net/http"

	"github.com/gofiber/fiber/v2"
	guuid "github.com/google/uuid"
	"github.com/julianstephens/boulder-buddy/backend/database"
	"github.com/julianstephens/boulder-buddy/backend/models"
	"github.com/julianstephens/boulder-buddy/backend/utils"
)

type Mesocycle = models.Mesocycle
type User = models.User
type Error = utils.Error

// Retrieve mesocyles
// @Summary Retrieve mesocyles
// @Description get all mesocyles for current user
// @Tags Mesos
// @Success 200 {object} []Mesocycle
// @Failure 500 {object} Error
// @Security Bearer
// @Router /mesos [get]
func GetMesos(c *fiber.Ctx) error {
	op := "mesos.GetMesos"
	db := database.DB
	user := c.Locals("user").(User)

	mesos := []Mesocycle{}
	query := Mesocycle{UserRefer: user.ID}
	err := db.Where(&query).Find(&mesos).Error
	if err != nil {
		return utils.NewError(utils.EINTERNAL, op, "Unable to retrieve mesocyles", []string{}, err)
	}

	return c.Status(http.StatusOK).JSON(mesos)
}

// Create a mesocyle
// @Summary Create a mesocyle
// @Description create a new mesocycle
// @Tags Mesos
// @Param data body Mesocycle true "new mesocycle info"
// @Success 200 {object} Mesocycle
// @Failure 500 {object} Error
// @Security Bearer
// @Router /mesos [post]
func CreateMeso(c *fiber.Ctx) error {
	op := "mesos.CreateMesos"
	db := database.DB
	user := c.Locals("user").(User)

	json := new(Mesocycle)
	if err := c.BodyParser(json); err != nil {
		return utils.NewError(utils.ECANNOTPARSE, op, "Cannot parse body", []string{"body"}, nil)
	}

	new := Mesocycle{
		Goal:        json.Goal,
		Description: json.Description,
		StartDate:   json.StartDate,
		EndDate:     json.EndDate,
		NumMicros:   json.NumMicros,
		IsActive:    json.IsActive,
		UserRefer:   user.ID,
		ID:          guuid.New(),
	}

	err := db.Create(&new).Error
	if err != nil {
		return utils.NewError(utils.EINTERNAL, op, "Unable to create mesocyle", []string{}, err)
	}

	return c.Status(http.StatusCreated).JSON(new)
}
