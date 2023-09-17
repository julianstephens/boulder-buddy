package models

import guuid "github.com/google/uuid"

// User model
type User struct {
	ID         guuid.UUID  `gorm:"column:id;primaryKey" json:"-"`
	CreatedAt  int64       `gorm:"column:created_at;autoCreateTime" json:"-" `
	UpdatedAt  int64       `gorm:"column:updated_at;autoUpdateTime:milli" json:"-"`
	CognitoID  string      `gorm:"column:cognito_id;unique;" json:"-"`
	Email      string      `gorm:"column:email;unique;" json:"email"`
	Mesocycles []Mesocycle `gorm:"foreignKey:UserRefer; constraint:OnUpdate:CASCADE, OnDelete:CASCADE;" json:"-"`
}
