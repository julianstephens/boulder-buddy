resource "aws_cognito_user_pool" "user_pool" {
  name = local.name

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  mfa_configuration        = "OPTIONAL"

  password_policy {
    minimum_length = 6
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "${title(join(" ", split("-", local.name)))} Account Confirmation"
    email_message        = "Your confirmation code is {####}"
  }


  software_token_mfa_configuration {
    enabled = true
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }
}


resource "aws_cognito_user_pool_client" "client" {
  name = "${local.name}-client"

  user_pool_id                         = aws_cognito_user_pool.user_pool.id
  generate_secret                      = false
  refresh_token_validity               = 7
  callback_urls                        = ["http://localhost:5173"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "aws.cognito.signin.user.admin"]
  supported_identity_providers         = ["COGNITO"]
}

resource "aws_cognito_user_pool_domain" "cognito-domain" {
  domain       = local.name
  user_pool_id = aws_cognito_user_pool.user_pool.id
}
