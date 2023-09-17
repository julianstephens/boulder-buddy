package models

import guuid "github.com/google/uuid"

type Mesocycle struct {
	ID          guuid.UUID `gorm:"primaryKey" json:"-"`
	Goal        string     `json:"goal"`
	Description string     `json:"description"`
	StartDate   int64      `json:"startDate"`
	EndDate     int64      `json:"endDate"`
	NumMicros   int64      `json:"numMicros"`
	IsActive    bool       `json:"isActive"`
	UserRefer   guuid.UUID `json:"-"`
	CreatedAt   int64      `gorm:"autoCreateTime" json:"-" `
	UpdatedAt   int64      `gorm:"autoUpdateTime:milli" json:"-"`
}
