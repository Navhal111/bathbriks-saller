# Use a stable Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy both manifests
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm ci --omit=dev --legacy-peer-deps

# Copy build and public files, etc.
COPY .next .next
COPY public public

EXPOSE 3001
CMD ["npx", "next", "start"]