#!/bin/bash

# Navigate to the application directory
cd /home/ubuntu/ebooks-backend

# Install dependencies
npm install

# Start the PM2 process
pm2 start server.js --name "server"

# Save the PM2 process list to automatically restart on server reboot
pm2 save
