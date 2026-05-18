#!/bin/bash
# deploy.sh — Full AWS deployment script for مكتب الهوجان legal-site
# Prerequisites: AWS CLI configured, Docker running, domain in Route 53

set -e

# ====== CONFIGURATION — Edit these values ======
AWS_REGION="me-south-1"           # Bahrain — closest to Saudi Arabia
DOMAIN="alhawjan.com"
APP_NAME="legal-site"
CERTIFICATE_ARN=""                 # Set after: aws acm request-certificate ...
VPC_SUBNET="subnet-XXXXXXXXX"     # Your subnet ID
VPC_SG="sg-XXXXXXXXX"            # Your security group ID

# Auto-derive from AWS
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPO="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$APP_NAME"
CLUSTER_NAME="$APP_NAME-cluster"
SERVICE_NAME="$APP_NAME-service"

echo ""
echo "======================================"
echo "  مكتب الهوجان — AWS Deployment"
echo "======================================"
echo "  Region:  $AWS_REGION"
echo "  Domain:  $DOMAIN"
echo "  Account: $AWS_ACCOUNT_ID"
echo "======================================"
echo ""

# ====== STEP 1: Build Docker image ======
echo "📦 [1/7] Building Docker image..."
docker build -t $APP_NAME:latest .
echo "✅ Docker image built"

# ====== STEP 2: Push to ECR ======
echo "🔐 [2/7] Pushing to ECR..."
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin \
  "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

aws ecr create-repository --repository-name $APP_NAME \
  --region $AWS_REGION 2>/dev/null || echo "  ECR repo exists, skipping..."

docker tag $APP_NAME:latest $ECR_REPO:latest
docker push $ECR_REPO:latest
echo "✅ Image pushed: $ECR_REPO:latest"

# ====== STEP 3: CloudWatch logs ======
echo "📋 [3/7] Creating CloudWatch log group..."
aws logs create-log-group \
  --log-group-name "/ecs/$APP_NAME" \
  --region $AWS_REGION 2>/dev/null || true
echo "✅ Log group ready"

# ====== STEP 4: ECS Cluster ======
echo "🏗 [4/7] Creating ECS Fargate cluster..."
aws ecs create-cluster \
  --cluster-name $CLUSTER_NAME \
  --capacity-providers FARGATE \
  --region $AWS_REGION 2>/dev/null || echo "  Cluster exists, skipping..."
echo "✅ Cluster: $CLUSTER_NAME"

# ====== STEP 5: Task Definition ======
echo "📋 [5/7] Registering ECS task definition..."
TASK_DEF=$(cat <<EOF
{
  "family": "$APP_NAME",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::$AWS_ACCOUNT_ID:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "$APP_NAME",
      "image": "$ECR_REPO:latest",
      "portMappings": [{"containerPort": 3000, "protocol": "tcp"}],
      "essential": true,
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "NEXTAUTH_URL", "value": "https://$DOMAIN"},
        {"name": "DATABASE_URL", "value": "file:./prisma/prod.db"}
      ],
      "secrets": [
        {"name": "ANTHROPIC_API_KEY", "valueFrom": "arn:aws:ssm:$AWS_REGION:$AWS_ACCOUNT_ID:parameter/legal-site/ANTHROPIC_API_KEY"},
        {"name": "NEXTAUTH_SECRET", "valueFrom": "arn:aws:ssm:$AWS_REGION:$AWS_ACCOUNT_ID:parameter/legal-site/NEXTAUTH_SECRET"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/$APP_NAME",
          "awslogs-region": "$AWS_REGION",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/ || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
EOF
)

aws ecs register-task-definition \
  --cli-input-json "$TASK_DEF" \
  --region $AWS_REGION > /dev/null
echo "✅ Task definition registered"

# ====== STEP 6: ECS Service ======
echo "⚙️ [6/7] Deploying ECS service..."
NETWORK_CONFIG="awsvpcConfiguration={subnets=[$VPC_SUBNET],securityGroups=[$VPC_SG],assignPublicIp=ENABLED}"

# Try update first, create if not exists
if aws ecs describe-services \
  --cluster $CLUSTER_NAME \
  --services $SERVICE_NAME \
  --region $AWS_REGION \
  --query "services[?status=='ACTIVE'].serviceArn" \
  --output text | grep -q "arn:"; then

  aws ecs update-service \
    --cluster $CLUSTER_NAME \
    --service $SERVICE_NAME \
    --task-definition $APP_NAME \
    --force-new-deployment \
    --region $AWS_REGION > /dev/null
  echo "✅ ECS service updated"
else
  aws ecs create-service \
    --cluster $CLUSTER_NAME \
    --service-name $SERVICE_NAME \
    --task-definition $APP_NAME \
    --launch-type FARGATE \
    --desired-count 1 \
    --network-configuration "$NETWORK_CONFIG" \
    --region $AWS_REGION > /dev/null
  echo "✅ ECS service created"
fi

# ====== STEP 7: Route 53 DNS ======
echo "🌐 [7/7] Updating Route 53 DNS..."
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
  --dns-name $DOMAIN \
  --query "HostedZones[0].Id" \
  --output text | cut -d'/' -f3 2>/dev/null)

if [ -n "$HOSTED_ZONE_ID" ] && [ -n "$CLOUDFRONT_DOMAIN" ]; then
  aws route53 change-resource-record-sets \
    --hosted-zone-id $HOSTED_ZONE_ID \
    --change-batch "{
      \"Changes\": [{
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"$DOMAIN\",
          \"Type\": \"A\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"Z18D5FSROUN65G\",
            \"DNSName\": \"$CLOUDFRONT_DOMAIN\",
            \"EvaluateTargetHealth\": false
          }
        }
      }]
    }" > /dev/null
  echo "✅ Route 53 DNS updated"
else
  echo "⚠️  Skipping Route 53 (set CLOUDFRONT_DOMAIN variable first)"
fi

echo ""
echo "======================================"
echo "  🎉 DEPLOYMENT COMPLETE!"
echo "======================================"
echo "  Site: https://$DOMAIN"
echo "  ECS:  $CLUSTER_NAME/$SERVICE_NAME"
echo "  Logs: CloudWatch /ecs/$APP_NAME"
echo ""
echo "  Next steps:"
echo "  1. Set up CloudFront distribution pointing to ALB"
echo "  2. Set CLOUDFRONT_DOMAIN and re-run for DNS"
echo "  3. Add secrets to SSM Parameter Store:"
echo "     aws ssm put-parameter --name /legal-site/ANTHROPIC_API_KEY --value 'sk-ant-...' --type SecureString"
echo "======================================"
