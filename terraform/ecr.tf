resource "aws_ecr_repository" "orders" {
  name                 = "${var.project_name}-orders-api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = "${var.project_name}-orders-api"
  }
}