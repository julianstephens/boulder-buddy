package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/julianstephens/boulder-buddy/backend/handlers"
	"github.com/julianstephens/boulder-buddy/backend/models"
	"github.com/julianstephens/boulder-buddy/backend/utils"

	"github.com/lestrrat-go/jwx/jwk"
)

type Response models.Response

type CognitoUser struct {
	Sub      string    `json:"sub"`
	Email    string    `json:"email"`
	Verified string    `json:"email_verified"`
	Created  time.Time `json:"created"`
	Modified time.Time `json:"last_modified"`
}

type CognitoTokens struct {
	ID      string `json:"token_id"`
	Access  string `json:"access_token"`
	Refresh string `json:"refresh_token"`
	Expires int    `json:"expires_in"`
	Type    string `json:"token_type"`
	Error   string `json:"error,omitempty"`
}

// Middleware that checks incoming requests for valid JWTs
func Authenticate(c *fiber.Ctx) error {
	bearer := c.GetReqHeaders()["Authorization"]
	bearerSplit := strings.Split(bearer, " ")
	if len(bearerSplit) != 2 {
		return utils.AuthError()
	}

	token, err := verifyTokenString(bearerSplit[1])
	if err != nil {
		log.Println("did not verify token", err)
		return utils.AuthError()
	}

	claims, _ := token.Claims.(jwt.MapClaims)
	userID := claims["username"].(string)
	cognitoUser, err := getUserInfo(userID, token.Raw)
	if err != nil {
		return utils.AuthError()
	}
	user, err := handlers.GetUser(cognitoUser.Email)
	if err != nil {
		return utils.AuthError()
	}
	c.Locals("user", user)
	return c.Next()
}

// Loads the App's RSA public keys into memory.
// In order to validate a JWTs signature, the private key id issued
// by cognito must be compared to the public key id.
func loadCognitoJWKs() (jwk.Set, error) {
	region := utils.Getenv("AWS_COGNITO_REGION", "us-east-1")
	pool := utils.Getenv("AWS_COGNITO_POOL_ID", "")
	uri := fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json", region, pool)
	keySet, err := jwk.Fetch(context.TODO(), uri)
	if err != nil {
		return nil, err
	}
	return keySet, nil
}

// Verifies these things about the token:
// 1. not expired
// 2. the audience (aud) matches the app client id (created in the AWS Cognito User Pool)
// 3. the issuer (iss) matches the user pool
// 4. token_use should be access or id
//
// DOCS [MAY 2021]:
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
func validClaims(token *jwt.Token) error {
	region := utils.Getenv("AWS_COGNITO_REGION", "us-east-1")
	pool := utils.Getenv("AWS_COGNITO_POOL_ID", "")
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return fmt.Errorf("could not check claims")
	}
	if !claims.VerifyExpiresAt(time.Now().Unix(), true) {
		return fmt.Errorf("token expired")
	}
	if !claims.VerifyIssuer(fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s", region, pool), true) {
		return fmt.Errorf("invalid issuer")
	}
	return nil
}

// Parses, verifies, and returns the given token
func verifyTokenString(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if signingMethod := token.Method.Alg(); signingMethod != "RS256" {
			return nil, fmt.Errorf("mismatched signing method: %s", signingMethod)
		}
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, fmt.Errorf("missing private kid")
		}
		jwks, err := loadCognitoJWKs()
		if err != nil {
			return nil, err
		}

		key, ok := jwks.LookupKeyID(kid)
		if !ok {
			return nil, fmt.Errorf("no match for given kid")
		}
		if err := validClaims(token); err != nil {
			return nil, fmt.Errorf("invalid claims: %v", err)
		}
		var raw interface{}
		return raw, key.Raw(&raw)
	})
	return token, err
}

func getUserInfo(userId string, token string) (*CognitoUser, error) {
	domain := utils.Getenv("AWS_COGNITO_DOMAIN", "")
	uri := fmt.Sprintf("https://%s/oauth2/userInfo", domain)

	agent := fiber.AcquireAgent()
	agent.Request().Header.SetMethod("GET")
	agent.Request().Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))
	agent.Request().SetRequestURI(uri)

	err := agent.Parse()
	if err != nil {
		return nil, err
	}

	_, body, errs := agent.Bytes()
	if len(errs) > 0 {
		return nil, fmt.Errorf("unable to process user info")
	}

	var user CognitoUser
	err = json.Unmarshal(body, &user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
