# This Dockerfile should be in the ROOT directory (simple_rent/)

# Stage 1: Build Angular application
FROM node:18-alpine AS angular-build

WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./

# Install ALL dependencies (including dev dependencies for building)
RUN npm ci

# Copy Angular source code
COPY frontend/ ./

# Build Angular application
RUN npm run build -- --configuration=production


# Stage 2: Setup Node.js backend server
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files for frontend server
COPY frontend_server/package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy server code
COPY frontend_server/server.js ./

# Copy built Angular files from the angular-build stage
# IMPORTANT: Update 'frontend' below to match your actual Angular project name
# Check the output of 'ls dist/' in your frontend directory
COPY --from=angular-build /app/dist/angular-primeng-app ./dist

# If your Angular builds to a different path, use one of these instead:
# COPY --from=angular-build /app/dist/your-app-name ./dist
# COPY --from=angular-build /app/dist ./dist

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the server
CMD ["node", "server.js"]