terraform {
  backend "s3" {
    bucket       = "arnab-ecs-interview-terraform-state-730335474585"
    key          = "ecs-interview/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}
