terraform {
  backend "s3" {
    bucket       = "arnab-ecs-interview-terraform-state-590184140150"
    key          = "ecs-interview/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
