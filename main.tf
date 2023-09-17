terraform {
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = "~> 4.16"
      }
    }

    required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
  profile= "default"

  default_tags {
    tags = {
      Environment = "Test"
    }
  }
}

locals {
  name = var.app_name
}