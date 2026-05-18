#!/bin/bash
# ssm-secrets.sh — Store secrets in AWS SSM Parameter Store

AWS_REGION="me-south-1"

echo "🔐 Storing secrets in AWS SSM Parameter Store..."

read -p "ANTHROPIC_API_KEY: " ANTHROPIC_KEY
read -sp "NEXTAUTH_SECRET: " NEXTAUTH_SECRET
echo ""
read -sp "ADMIN_PASSWORD: " ADMIN_PASSWORD
echo ""

aws ssm put-parameter \
  --name "/legal-site/ANTHROPIC_API_KEY" \
  --value "$ANTHROPIC_KEY" \
  --type "SecureString" \
  --region $AWS_REGION \
  --overwrite

aws ssm put-parameter \
  --name "/legal-site/NEXTAUTH_SECRET" \
  --value "$NEXTAUTH_SECRET" \
  --type "SecureString" \
  --region $AWS_REGION \
  --overwrite

aws ssm put-parameter \
  --name "/legal-site/ADMIN_PASSWORD" \
  --value "$ADMIN_PASSWORD" \
  --type "SecureString" \
  --region $AWS_REGION \
  --overwrite

echo "✅ All secrets stored in SSM"
