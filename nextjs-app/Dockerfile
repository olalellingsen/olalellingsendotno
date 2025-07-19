# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Next.js app (can use export for static, or build if server-rendered)
RUN npm run build

# 2. Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install only production deps
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy built app
COPY --from=builder /app ./

# Set environment
ENV NODE_ENV=production

# Next.js server listens on port 8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
