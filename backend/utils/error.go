package utils

import (
	"errors"
	"runtime"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func CallerFunctionName() string {
	// Skip callerFunctionName and the function to get the caller of
	return getFrame(2).Function
}

func CurrentFunctionName() string {
	// Skip CurrentFunctionName
	return getFrame(1).Function
}

func getFrame(skipFrames int) runtime.Frame {
	// We need the frame at index skipFrames+2, since we never want runtime.Callers and getFrame
	targetFrameIndex := skipFrames + 2

	// Set size to targetFrameIndex+2 to ensure we have room for one more caller than we need
	programCounters := make([]uintptr, targetFrameIndex+2)
	n := runtime.Callers(0, programCounters)

	frame := runtime.Frame{Function: "unknown"}
	if n > 0 {
		frames := runtime.CallersFrames(programCounters[:n])
		for more, frameIndex := true, 0; more && frameIndex <= targetFrameIndex; frameIndex++ {
			var frameCandidate runtime.Frame
			frameCandidate, more = frames.Next()
			if frameIndex == targetFrameIndex {
				frame = frameCandidate
			}
		}
	}

	return frame
}

type errorCode string

func (code errorCode) String() string {
	return string(code)
}

// Application error codes.
const (
	// ECONFLICT Action cannot be performed.
	ECONFLICT errorCode = "conflict"
	// EINTERNAL internal error.
	EINTERNAL errorCode = "internal"
	// EINVALID validation failed.
	EINVALID errorCode = "invalid"
	// ENOTFOUND entity not found/doesn't exist.
	ENOTFOUND errorCode = "not_found"
	// ENOTMODIFIED entity not modified.
	ENOTMODIFIED errorCode = "not_modified"
	// EALREADYEXISTS entity already exists.
	EALREADYEXISTS errorCode = "already_exists"
	// EPermissionDenied user does not have permission.
	EPERMISSIONDENIED errorCode = "permission_denied"
	// EUNAUTHENTICATED Requestor does not have valid authentication to perform to operation.
	EUNAUTHENTICATED errorCode = "unauthenticated"
	// ECANNOTDECODE Data could not be decoded.
	ECANNOTDECODE errorCode = "cannot_decode"
	// ECANNOTENCODE Data could not be encoded.
	ECANNOTENCODE errorCode = "cannot_encode"
	// ECANNOTPARSE Data could not be parsed.
	ECANNOTPARSE errorCode = "cannot_parse"
	// EBEHAVIOUR something that must not be.
	EBEHAVIOUR errorCode = "undefined_behavior"
	// EUNSUPPORTED means that we dont support some actions
	// and this actions should be handled by others.
	EUNSUPPORTED errorCode = "unsupported"
	// ETEST test error code, useful for testing.
	ETEST errorCode = "test_error_code"

	DefaultErrorMessage = "An internal error has occurred"
)

var codeToHTTPStatusMap = map[errorCode]int{
	// ECONFLICT Action cannot be performed.
	ECONFLICT: fiber.StatusConflict,
	// EINTERNAL internal error.
	EINTERNAL: fiber.StatusInternalServerError,
	// EINVALID validation failed.
	EINVALID: fiber.StatusBadRequest,
	// ENOTFOUND entity not found/doesn't exist.
	ENOTFOUND: fiber.StatusNotFound,
	// ENOTMODIFIED entity not modified.
	ENOTMODIFIED: fiber.StatusNotModified,
	// EALREADYEXISTS entity already exists.
	EALREADYEXISTS: fiber.StatusBadRequest,
	// EPermissionDenied user does not have permission.
	EPERMISSIONDENIED: fiber.StatusForbidden,
	// EUNAUTHENTICATED Requestor does not have valid authentication to perform to operation.
	EUNAUTHENTICATED: fiber.StatusUnauthorized,
	// ECANNOTDECODE Data could not be decoded.
	ECANNOTDECODE: fiber.StatusUnprocessableEntity,
	// ECANNOTENCODE Data could not be encoded.
	ECANNOTENCODE: fiber.StatusUnprocessableEntity,
	// ECANNOTPARSE Data could not be parsed.
	ECANNOTPARSE: fiber.StatusUnprocessableEntity,
	// EBEHAVIOUR something that must not be.
	EBEHAVIOUR: fiber.StatusInternalServerError,
	// EUNSUPPORTED means that we dont support some actions
	// and this actions should be handled by others.
	EUNSUPPORTED:        fiber.StatusNotImplemented,
	DefaultErrorMessage: fiber.StatusInternalServerError,
}

// Error defines a standard application error.
type Error struct {
	// Wrapped error
	Err error `json:"stack"`
	// Some context of error
	Fields []string `json:"fields"`
	// Machine-readable error code.
	Code errorCode `json:"code"`
	// Human-readable message.
	Message string `json:"message"`
	// Logical operation.
	Op string `json:"op"`
}

func (e *Error) Unwrap() error { return e.Err }

func (e *Error) Is(err error) bool {
	target := &Error{}
	return errors.As(err, &target)
}

// Error returns the string representation of the error message.
func (e *Error) Error() string {
	var buf strings.Builder

	if e.Op != "" {
		buf.WriteString(e.Op)
		buf.WriteString(": ")
	}

	if e.Err != nil {
		buf.WriteString(e.Err.Error())
	} else {
		if e.Code != "" {
			buf.WriteRune('<')
			buf.WriteString(string(e.Code))
			buf.WriteRune('>')
		}
		if e.Code != "" && e.Message != "" {
			// add a space
			buf.WriteRune(' ')
		}
		buf.WriteString(e.Message)
	}

	return buf.String()
}

// ErrorCode returns the code of the error, if available. Otherwise returns EINTERNAL.
func ErrorCode(err error) errorCode {
	if err == nil {
		return ""
	}
	target := &Error{}
	if errors.As(err, &target) {
		if target.Code != "" {
			return target.Code
		}

		if target.Err != nil {
			return ErrorCode(target.Err)
		}
	}

	return EINTERNAL
}

// ErrorMessage returns the human-readable message of the error, if available.
// Otherwise returns a generic error message.
func ErrorMessage(err error) string {
	return ErrorMessageDefault(err, DefaultErrorMessage)
}

// ErrorMessage returns the human-readable message of the error, if available.
// Otherwise returns default message if default is not empty, otherwise return err.Error().
func ErrorMessageDefault(err error, def string) string {
	if err == nil {
		return ""
	}
	target := &Error{}
	if errors.As(err, &target) {
		if target.Message != "" {
			return target.Message
		}

		if target.Err != nil {
			return ErrorMessageDefault(target.Err, def)
		}
	}

	if def != "" {
		return def
	}

	return err.Error()
}

func ErrorFields(err error) []string {
	if err == nil {
		return nil
	}
	fields := []string{}
	target := &Error{}
	if errors.As(err, &target) {
		if len(target.Fields) > 0 {
			fields = target.Fields
		}

		if target.Err != nil {
			f := ErrorFields(target.Err)
			if len(f) > 0 {
				fields = f
			}
		}
	}

	return fields
}

func ErrorTrace(err error) []string {
	if err == nil {
		return nil
	}

	trace := []string{}
	target := &Error{}
	if errors.As(err, &target) {
		if target.Op != "" {
			trace = append(trace, target.Op)
		}
		if target.Err != nil {
			trace = append(trace, ErrorTrace(target.Err)...)
		}
	}

	return trace
}

// ErrorWithCode adds an error code to the provided error.
// If Error.Op is undefined, caller function name will be used as Op
// If the err is an Error && err.Code is undefined, the code is applied to the Error;
// If the err is an Error && err.Code is defined, the err is wrapped and the code is applied;
// If the err is a regular error, the error is wrapped and the code is applied.
func ErrorWithCode(err error, code errorCode) error {
	target := &Error{}
	if !errors.As(err, &target) {
		return &Error{
			Op:   CallerFunctionName(),
			Err:  err,
			Code: code,
		}
	}

	if target.Code == "" {
		if target.Op == "" {
			target.Op = CallerFunctionName()
		}

		target.Code = code

		return target
	}

	return &Error{
		Op:   CallerFunctionName(),
		Err:  err,
		Code: code,
	}
}

func OpError(op string, err error) error {
	target := &Error{}
	if !errors.As(err, &target) {
		return &Error{
			Op:  op,
			Err: err,
		}
	}

	if target.Op == "" {
		target.Op = op
		return target
	}

	return &Error{
		Op:  op,
		Err: err,
	}
}

func OpErrorOrNil(op string, err error) error {
	if err == nil {
		return nil
	}

	return OpError(op, err)
}

func NewError(code errorCode, op string, message string, fields []string, err error) error {
	return &Error{
		Code:    code,
		Op:      op,
		Fields:  fields,
		Message: message,
		Err:     err,
	}
}

func AuthError() error {
	return NewError(EPERMISSIONDENIED, "", "Not authorized", []string{}, nil)
}

func ErrCodeToHTTPStatus(err error) int {
	code := ErrorCode(err)
	if v, ok := codeToHTTPStatusMap[code]; ok {
		return v
	}

	// Return the default HTTP status for unknown errors
	return fiber.StatusInternalServerError
}

var (
	_ error = &Error{}
	_ interface {
		Is(error) bool
		Unwrap() error
	} = &Error{}
)
