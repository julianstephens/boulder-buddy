package models

import (
	"time"

	guuid "github.com/google/uuid"
)

type Session struct {
	SessionId guuid.UUID `gorm:"primaryKey" json:"sessionId"`
	Expires   time.Time  `json:"-"`
	UserRefer guuid.UUID `json:"-"`
	CreatedAt int64      `gorm:"autoCreateTime" json:"-" `
}
