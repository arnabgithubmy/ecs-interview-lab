resource "aws_dynamodb_table" "orders" {
  name         = "${var.project_name}-orders"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "orderId"

  attribute {
    name = "orderId"
    type = "S"
  }

  tags = {
    Name = "${var.project_name}-orders"
  }
}