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

COPY frontend_server/package*.json ./

RUN npm ci --omit=dev && \
    npm cache clean --force

COPY frontend_server/server.js ./
COPY --from=angular-build /app/dist/angular-primeng-app ./dist

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]