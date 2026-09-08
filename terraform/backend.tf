terraform {
  backend "s3" {
    bucket       = "arnab-ecs-interview-terraform-state-108383429107"
    key          = "ecs-interview/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}
