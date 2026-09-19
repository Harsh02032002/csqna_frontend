# 🚀 CSQNA Full VPS Deployment Guide (Ubuntu / Nginx / PM2 / SSL)

This guide walks you through deploying the **CSQNA** application (Frontend: `csqna-fresh`, Backend: `csqna_backend`) on an Ubuntu VPS (Hostinger, DigitalOcean, AWS, etc.).

---

## 1. Initial System Setup (Ubuntu)
Connect to your VPS via SSH and update packages:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip ufw build-essential
```

---

## 2. Install Node.js (v20 LTS) & PM2
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node version
node -v
npm -v

# Install PM2 Process Manager globally
sudo npm install -g pm2
```

---

## 3. Project File & Nginx Locations (On Your VPS)

- **Source Code Directory**: `/var/apps/csqna_fresh`
- **Backend Directory**: `/var/apps/csqna_backend`
- **Nginx Web Root**: `/var/www/csqna-fresh`
- **Nginx Config**: `/etc/nginx/conf.d/csqna.conf`

---

## 4. Frontend Deployment Commands (New Changes Reflect Karne Ke Liye)

Whenever you push frontend changes to Github, run this on your VPS:

```bash
# 1. Navigate to source directory
cd /var/apps/csqna_fresh

# 2. Pull latest code
git pull origin main

# 3. Generate production build
npm run build

# 4. Copy build files to Nginx web root directory (Force overwrite without asking)
\cp -rf dist/* /var/www/csqna-fresh/

# 5. Restart Nginx
systemctl restart nginx
```

---

## 5. Backend Deployment Commands (API Changes Reflect Karne Ke Liye)

Whenever you push backend changes to Github, run this on your VPS:

```bash
cd /var/apps/csqna_backend
git pull origin main
npm install
pm2 restart csqna-backend
```

Add your `.env` variables:
```env
PORT=5003
MONGO_URI=mongodb+srv://<USER>:<PASS>@cluster.mongodb.net/csqna
JWT_SECRET=your_secret_key_here
FRONTEND_URL=https://csqna.com
```

Start the backend process with PM2:
```bash
pm2 start v1/index.js --name "csqna-backend"
pm2 save
pm2 startup
```

---

## 6. Configure Nginx Web Server
```bash
# Install Nginx
sudo apt install -y nginx

# Create site configuration file
sudo nano /etc/nginx/sites-available/csqna.com
```

Paste the following Nginx configuration:
```nginx
server {
    listen 80;
    server_name csqna.com www.csqna.com;

    # Frontend React Build
    root /var/www/csqna/csqna-fresh/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend Express API Proxy
    location /v1/ {
        proxy_pass http://localhost:5003/v1/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/csqna.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 7. Enable SSL Certificate (Let's Encrypt / Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d csqna.com -d www.csqna.com
```

---

## 8. Useful PM2 & Server Commands
```bash
# Check Backend Logs
pm2 logs csqna-backend

# Restart Backend Service
pm2 restart csqna-backend

# Nginx Status & Logs
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log

# Firewall Setup
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```
