package models

import (
	guuid "github.com/google/uuid"
)

// User model
type User struct {
	ID         guuid.UUID  `gorm:"primaryKey" json:"-"`
	Username   string      `json:"username"`
	Email      string      `json:"email"`
	Password   string      `json:"-"`
	Sessions   []Session   `gorm:"foreignKey:UserRefer; constraint:OnUpdate:CASCADE, OnDelete:CASCADE;" json:"-"`
	Mesocycles []Mesocycle `gorm:"foreignKey:UserRefer; constraint:OnUpdate:CASCADE, OnDelete:CASCADE;" json:"-"`
	CreatedAt  int64       `gorm:"autoCreateTime" json:"-" `
	UpdatedAt  int64       `gorm:"autoUpdateTime:milli" json:"-"`
}
