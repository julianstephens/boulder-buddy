package models

import guuid "github.com/google/uuid"

type Mesocycle struct {
	ID          guuid.UUID `gorm:"column:id;primaryKey" json:"-"`
	CreatedAt   int64      `gorm:"column:created_at;autoCreateTime" json:"-" `
	UpdatedAt   int64      `gorm:"column:updated_at;autoUpdateTime:milli" json:"-"`
	Goal        string     `json:"goal"`
	Description string     `json:"description"`
	StartDate   int64      `json:"startDate"`
	EndDate     int64      `json:"endDate"`
	NumMicros   int64      `json:"numMicros"`
	IsActive    bool       `json:"isActive"`
	UserRefer   guuid.UUID `json:"-"`
}