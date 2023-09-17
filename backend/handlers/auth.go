package handlers

import (
	"net/http"
	"time"

	"github.com/badoux/checkmail"
	"github.com/gofiber/fiber/v2"
	guuid "github.com/google/uuid"
	"github.com/julianstephens/boulder-buddy/backend/database"
	"github.com/julianstephens/boulder-buddy/backend/models"
	"github.com/julianstephens/boulder-buddy/backend/utils"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User models.User
type Session models.Session
type Response models.Response

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// Register Request
// @Description New account information
type RegisterRequest struct {
	Password string `json:"password"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type ChangePasswordRequest struct {
	Password    string `json:"password"`
	NewPassword string `json:"newPassword"`
}

type DeleteUserRequest struct {
	password string
}

func GetUser(email string) (User, error) {
	db := database.DB
	query := User{Email: email}
	user := User{}
	err := db.First(&user, &query).Error
	if err == gorm.ErrRecordNotFound {
		return User{}, err
	}
	return user, nil
}

// Login ... Authenticate to the API
// @Summary Login
// @Description login a specific user
// @Tags Auth
// @Param data body LoginRequest true "returning user info"
// @Success 200 {object} Session
// @Failure 400 {object} Response
// @Failure 401 {object} Response
// @Failure 404 {object} Response
// @Router /auth/login [post]
func Login(c *fiber.Ctx) error {

	db := database.DB
	json := new(LoginRequest)
	if err := c.BodyParser(json); err != nil {
		return c.Status(http.StatusBadRequest).JSON(Response{Message: "Invalid JSON"})
	}

	found := User{}
	query := User{Username: json.Username}
	err := db.First(&found, &query).Error
	if err == gorm.ErrRecordNotFound {
		return c.Status(http.StatusNotFound).JSON(Response{Message: "User not found"})
	}
	if !comparePasswords(found.Password, []byte(json.Password)) {
		return c.Status(http.StatusUnauthorized).JSON(Response{Message: "Invalid Password"})
	}

	session := Session{UserRefer: found.ID, Expires: SessionExpires(), SessionId: guuid.New()}
	db.Create(&session)
	c.Cookie(&fiber.Cookie{
		Name:     "sessionId",
		Expires:  SessionExpires(),
		Value:    session.SessionId.String(),
		HTTPOnly: true,
	})
	return c.Status(http.StatusOK).JSON(session)
}

// Logout ... Remove API session
// @Summary Logout
// @Description logout a specific user
// @Tags Auth
// @Success 204
// @Failure 400 {object} Response
// @Failure 404 {object} Response
// @Router /auth/logout [delete]
func Logout(c *fiber.Ctx) error {
	db := database.DB
	json := new(Session)
	if err := c.BodyParser(json); err != nil {
		return c.Status(http.StatusBadRequest).JSON(Response{Message: "Invalid JSON"})
	}
	session := Session{}
	query := Session{SessionId: json.SessionId}
	err := db.First(&session, &query).Error
	if err == gorm.ErrRecordNotFound {
		return c.Status(http.StatusNotFound).JSON(Response{Message: "Session not found"})
	}
	db.Delete(&session)
	c.ClearCookie("sessionId")
	return c.SendStatus(http.StatusNoContent)
}

// Register ... Create a new user
// @Summary Register
// @Description create a new user
// @Tags Auth
// @Accept json
// @Param data body RegisterRequest true "new account info"
// @Success 200 {object} Session
// @Failure 400 {object} Response
// @Failure 500 {object} Response
// @Router /auth/register [post]
func Register(c *fiber.Ctx) error {
	op := "auth.Register"
	db := database.DB
	json := new(RegisterRequest)
	if err := c.BodyParser(json); err != nil {
		return utils.NewError(utils.ECANNOTPARSE, op, "Cannot parse body", []string{"body"}, nil)
	}
	password := hashAndSalt([]byte(json.Password))
	err := checkmail.ValidateFormat(json.Email)
	if err != nil {
		return utils.NewError(utils.EINVALID, op, "Invalid email address", []string{"body", "email"}, nil)
	}
	new := User{
		Username: json.Username,
		Password: password,
		Email:    json.Email,
		ID:       guuid.New(),
	}
	found := User{}
	query := User{Username: json.Username}
	err = db.First(&found, &query).Error
	if err != gorm.ErrRecordNotFound {
		return c.Status(http.StatusBadRequest).JSON(Response{Message: "User already exists"})
	}
	db.Create(&new)
	session := Session{UserRefer: new.ID, SessionId: guuid.New()}
	err = db.Create(&session).Error
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(Response{Message: "Unable to create user"})
	}
	c.Cookie(&fiber.Cookie{
		Name:     "sessionId",
		Expires:  time.Now().Add(5 * 24 * time.Hour),
		Value:    session.SessionId.String(),
		HTTPOnly: true,
	})
	return c.Status(http.StatusOK).JSON(session)
}

// Get Current User ... Retrieve user info
// @Summary Get Current User
// @Description retrieve info for current authenticated user
// @Tags Auth
// @Success 200 {object} User
// @Router /auth/me [get]
func GetUserInfo(c *fiber.Ctx) error {
	user := c.Locals("user").(User)
	return c.Status(http.StatusOK).JSON(user)
}

// Delete User ... Delete a user
// @Summary Delete User
// @Description delete a specific user
// @Tags Users
// @Success 204
// @Failure 400 {object} Response
// @Failure 401 {object} Response
// @Router /users [delete]
func DeleteUser(c *fiber.Ctx) error {
	db := database.DB
	json := new(DeleteUserRequest)
	user := c.Locals("user").(User)
	if err := c.BodyParser(json); err != nil {
		r := Response{Message: "Invalid JSON"}
		return c.Status(http.StatusBadRequest).JSON(r)
	}
	if !comparePasswords(user.Password, []byte(json.password)) {
		r := Response{Message: "Invalid Password"}
		return c.Status(http.StatusUnauthorized).JSON(r)
	}
	db.Model(&user).Association("Sessions").Delete()
	db.Model(&user).Association("Products").Delete()
	db.Delete(&user)
	c.ClearCookie("sessionId")
	return c.SendStatus(http.StatusNoContent)
}

// Change password ... Modify a user's password
// @Summary Change password
// @Description modify a user's password
// @Tags Users
// @Success 204
// @Failure 400 {object} Response
// @Failure 401 {object} Response
// @Router /users [put]
func ChangePassword(c *fiber.Ctx) error {
	db := database.DB
	user := c.Locals("user").(User)
	json := new(ChangePasswordRequest)
	if err := c.BodyParser(json); err != nil {
		r := Response{Message: "Invalid JSON"}
		return c.Status(http.StatusBadRequest).JSON(r)
	}
	if !comparePasswords(user.Password, []byte(json.Password)) {
		r := Response{Message: "Invalid Password"}
		return c.Status(http.StatusUnauthorized).JSON(r)
	}
	user.Password = hashAndSalt([]byte(json.NewPassword))
	db.Save(&user)
	return c.SendStatus(http.StatusNoContent)
}

func hashAndSalt(pwd []byte) string {
	hash, _ := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	return string(hash)
}

func comparePasswords(hashedPwd string, plainPwd []byte) bool {
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
	return err == nil
}

// Universal date the Session Will Expire
func SessionExpires() time.Time {
	return time.Now().Add(5 * 24 * time.Hour)
}
