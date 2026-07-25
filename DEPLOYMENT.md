# EduLens - Deployment Gids

## Table of Contents
1. [Vercel Deployment](#vercel-deployment)
2. [Docker Deployment](#docker-deployment)
3. [Traditional Server](#traditional-server)
4. [Environment Setup](#environment-setup)
5. [Troubleshooting](#troubleshooting)

---

## Vercel Deployment

### Snelste & Gemakkelijkste Manier ⭐

### Prerequisites
- GitHub account
- Vercel account (gratis op vercel.com)

### Stap 1: Voorbereiding

```bash
# Zorg dat je code in git zit
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Stap 2: Vercel Setup

1. Ga naar [vercel.com](https://vercel.com)
2. Klik "Sign Up" en log in met GitHub
3. Klik "New Project"
4. Selecteer je `edulens` repository
5. Vercel detecteert automatisch Next.js
6. Klik "Deploy"

### Stap 3: Custom Domain (Optioneel)

1. Ga naar Project Settings
2. Klik "Domains"
3. Voeg je domein toe (bijv. edulens.nl)
4. Volg DNS instructies

### Auto-Deployment

Elke keer dat je naar `main` branch pushed, deploy Vercel automatisch!

---

## Docker Deployment

### Voor Professioneel Gebruik

### Prerequisites
- Docker installed (docker.com)
- Docker Hub account (optioneel)

### Stap 1: Dockerfile Aanmaken

Voeg deze file toe in root directory:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm", "--name", "edulens", "--", "start"]
```

### Stap 2: .dockerignore File

Maak `.dockerignore` bestand:

```
node_modules
npm-debug.log
.next
.git
.gitignore
README.md
.env.local
.env.*.local
```

### Stap 3: Build Image

```bash
docker build -t edulens:1.0.0 .
```

### Stap 4: Run Container

```bash
# Development
docker run -p 3000:3000 edulens:1.0.0

# Production met environment variabelen
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --name edulens-prod \
  edulens:1.0.0
```

### Stap 5: Docker Compose (Optioneel)

Maak `docker-compose.yml`:

```yaml
version: '3.8'

services:
  edulens:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://localhost:3000
    restart: unless-stopped
    container_name: edulens-app
```

Run met:

```bash
docker-compose up -d
```

---

## Traditional Server

### Voor VPS/Dedicated Server

### Prerequisites
- Linux Server (Ubuntu 20.04+)
- SSH Access
- Root of sudo permissions

### Stap 1: Server Setup

```bash
# SSH in server
ssh root@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Stap 2: Clone Repository

```bash
# Create app directory
mkdir -p /home/edulens
cd /home/edulens

# Clone repo
git clone https://github.com/MeesterDo-byte/edulens.git .

# Install dependencies
npm install
```

### Stap 3: Build Production

```bash
# Build app
npm run build

# Test it works
npm start
```

### Stap 4: Process Manager (PM2)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start app with PM2
pm2 start npm --name "edulens" -- start

# Setup startup script
pm2 startup
pm2 save

# Check status
pm2 status
```

### Stap 5: Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install -y nginx

# Enable Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Create `/etc/nginx/sites-available/edulens`:

```nginx
upstream edulens_app {
    server localhost:3000;
}

server {
    listen 80;
    server_name edulens.example.com www.edulens.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name edulens.example.com www.edulens.example.com;

    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/edulens.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/edulens.example.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Proxy settings
    location / {
        proxy_pass http://edulens_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript;
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/edulens /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Stap 6: SSL Certificate (Let's Encrypt)

```bash
# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d edulens.example.com -d www.edulens.example.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

---

## Environment Setup

### Production Environment Variables

Create `/home/edulens/.env.production`:

```env
# App
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://edulens.example.com
NEXT_PUBLIC_APP_NAME=EduLens

# Security
NEXT_PUBLIC_SESSION_TIMEOUT=3600000
NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS=5

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=UA-XXXXXXXXX-X
```

### Load .env in PM2

Edit ecosystem.config.js:

```javascript
module.exports = {
  apps: [
    {
      name: 'edulens',
      script: './node_modules/.bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_URL: 'https://edulens.example.com',
      },
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
```

Start met:

```bash
pm2 start ecosystem.config.js
```

---

## Troubleshooting

### Vercel Errors

**Error: "Build failed"**
```bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run lint
```

**Error: "Module not found"**
```bash
# Update dependencies
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues

**Error: "Port 3000 already in use"**
```bash
# Use different port
docker run -p 3001:3000 edulens:1.0.0
```

**Error: "Out of memory"**
```bash
# Increase Docker memory
docker run -m 2g -p 3000:3000 edulens:1.0.0
```

### Server Issues

**Error: "502 Bad Gateway"**
```bash
# Check if app is running
pm2 status

# Restart app
pm2 restart edulens

# Check logs
pm2 logs edulens
```

**Error: "Connection refused"**
```bash
# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check firewall
sudo ufw allow 80
sudo ufw allow 443
```

### Database Connection Issues

```bash
# Check Node.js memory
free -h

# Increase swap (if needed)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## Performance Optimization

### Enable Caching

In Nginx config, add:

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
}
```

### Enable Compression

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1000;
gzip_types text/plain text/css text/xml text/javascript
           application/x-javascript application/xml+rss
           application/javascript application/json;
```

### Monitor Performance

```bash
# Check app resource usage
pm2 monit

# View detailed logs
pm2 logs edulens --lines 100 --err
```

---

## Support

Het u problemen met deployment? Open een issue op GitHub:
https://github.com/MeesterDo-byte/edulens/issues
