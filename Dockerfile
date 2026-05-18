FROM node:20-slim AS builder
WORKDIR /app

# Install Python + build tools required by better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npx prisma generate
RUN npm run build

# ─────────────────────────────────────────────
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Standalone Next.js output (includes its own minimal node_modules)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Add better-sqlite3 native binary (not included in standalone)
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Startup script and prisma migrations
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080

CMD ["sh", "-c", "node scripts/startup.js && node server.js"]
