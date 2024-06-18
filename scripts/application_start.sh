#!/bin/bash

# Restart the Node.js application using PM2
cd /home/ubuntu/ebooks-backend
pm2 restart server.js
