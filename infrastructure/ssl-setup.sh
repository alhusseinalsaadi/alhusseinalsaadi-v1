#!/bin/bash
# ssl-setup.sh — Request ACM certificate BEFORE running deploy.sh
# CloudFront requires certificates in us-east-1 regardless of site region

DOMAIN="alhawjan.com"

echo "📜 Requesting SSL certificate for $DOMAIN and *.$DOMAIN ..."

CERT_ARN=$(aws acm request-certificate \
  --domain-name "$DOMAIN" \
  --subject-alternative-names "*.$DOMAIN" \
  --validation-method DNS \
  --region us-east-1 \
  --query CertificateArn \
  --output text)

echo "✅ Certificate requested: $CERT_ARN"
echo ""
echo "Next steps:"
echo "1. Run: aws acm describe-certificate --certificate-arn $CERT_ARN --region us-east-1"
echo "2. Add the CNAME validation records to Route 53"
echo "3. Wait ~5 minutes for validation"
echo "4. Add CERTIFICATE_ARN=\"$CERT_ARN\" to deploy.sh"
