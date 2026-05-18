# مكتب الهوجان للمحاماة — موقع قانوني احترافي

موقع ويب كامل بالعربية RTL لمكتب محاماة سعودي، مبني بـ Next.js 16 مع مساعد ذكاء اصطناعي "سالم" لإغلاق الصفقات.

## 🚀 Quick Start

### 1. تثبيت الحزم
```bash
npm install --legacy-peer-deps
```

### 2. الإعداد البيئي
```bash
# عدّل .env وأضف:
ANTHROPIC_API_KEY=sk-ant-your-key-here
ADMIN_EMAIL=admin@yoursite.com
ADMIN_PASSWORD=YourSecurePassword
```

### 3. قاعدة البيانات
```bash
DATABASE_URL="file:./prisma/dev.db" npx prisma migrate dev
```

### 4. تشغيل التطوير
```bash
DATABASE_URL="file:./prisma/dev.db" npm run dev
```

الموقع: http://localhost:3000
لوحة التحكم: http://localhost:3000/admin/login

## ☁️ AWS Deployment

```bash
# 1. SSL
./infrastructure/ssl-setup.sh

# 2. Secrets
./infrastructure/ssm-secrets.sh

# 3. عدّل infrastructure/deploy.sh (DOMAIN, VPC_SUBNET, VPC_SG)

# 4. نشر
./infrastructure/deploy.sh
```

## 📁 الملفات الرئيسية

| الملف | الوصف |
|-------|-------|
| `lib/ai-config.ts` | System prompt سالم — خصّصه حسب مكتبك |
| `components/ai/AIChatWidget.tsx` | واجهة المساعد الذكي |
| `components/ui/WhatsAppButton.tsx` | رقم واتساب — عدّله |
| `components/layout/Header.tsx` | الشعار والهاتف |
| `app/layout.tsx` | Schema markup + metadata |
| `infrastructure/deploy.sh` | AWS ECS Fargate deployment |

## ✅ ما تم بناؤه

- [x] Arabic RTL — Dark Navy + Gold design
- [x] AI Chat Widget "سالم" — lead capture تلقائي
- [x] WhatsApp floating button + bounce animation
- [x] Hero + Stats (Count-Up) + Services + Testimonials carousel
- [x] Cookie Consent (نظام حماية البيانات 1445هـ)
- [x] 6 صفحات خدمات مع محتوى عربي كامل + FAQs
- [x] Schema Markup JSON-LD (LegalService + LocalBusiness)
- [x] Admin CMS — posts, news, leads (محادثات سالم), settings
- [x] Blog + News + dynamic slugs
- [x] Prisma 7 + SQLite (Post, Page, Lead)
- [x] Dockerfile + ECS Fargate + CloudFront deployment scripts
- [x] Build: 30 routes — 0 errors ✓
