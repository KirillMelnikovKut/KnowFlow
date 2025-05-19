# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install npm packages
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm install

# Copy project files
COPY . .

# Build the project (skipping TypeScript checks)
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built files and nginx config
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 