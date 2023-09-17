variable "aws_region" {
  type = string
  description = "The region in which the resources will be created"
  default = "us-east-1"
}

variable "app_name" {
  type = string
  description = "The name prefix for app resources"
}