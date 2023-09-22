package models

import guuid "github.com/google/uuid"

type Mesocycle struct {
	ID          guuid.UUID `gorm:"column:id;primaryKey" json:"-"`
	CreatedAt   int64      `gorm:"column:created_at;autoCreateTime" json:"-" `
	UpdatedAt   int64      `gorm:"column:updated_at;autoUpdateTime:milli" json:"-"`
	Goal        string     `gorm:"not null;" validate:"required" json:"goal"`
	Description string     `json:"description"`
	StartDate   int64      `gorm:"column:start_date;not null;" validate:"required" json:"startDate"`
	EndDate     int64      `gorm:"column:end_date;not null;" validate:"required" json:"endDate"`
	MaxMicros   int64      `gorm:"colum:max_micros;not null;" validate:"required" json:"maxMicros"`
	IsActive    bool       `gorm:"column:is_active;not null;" validate:"required" json:"isActive"`
	UserRefer   guuid.UUID `gorm:"column:user_refer;not null;" json:"-"`
}
