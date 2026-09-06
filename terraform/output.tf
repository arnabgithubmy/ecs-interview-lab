output "ecr_repository_url" {
  value = aws_ecr_repository.orders.repository_url
}

output "alb_dns_name" {
  value = aws_lb.orders.dns_name
}

output "vpc_id" {
  value = aws_vpc.main.id
}

