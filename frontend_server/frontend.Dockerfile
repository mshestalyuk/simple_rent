# Stage 1: Build Angular application
FROM node:18-alpine AS angular-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build -- --configuration=production


# Stage 2: Setup Node.js backend server
FROM node:18-alpine AS production

RUN apk add --no-cache dumb-init
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files for frontend server
COPY frontend_server/package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy server code
COPY frontend_server/server.js ./
COPY --from=angular-build /app/dist/angular-primeng-app ./dist

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

ENV NODE_ENV=production
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]