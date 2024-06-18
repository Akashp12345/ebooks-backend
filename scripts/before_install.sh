#!/bin/bash
# Install node.js and PM2 globally
pm2 stop server || true
cd /home/ubuntu/ebooks-backend
git pull origin main