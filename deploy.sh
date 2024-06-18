#!/bin/bash

# Variables
APP_DIR="/home/ubuntu/ebooks-backend"
REPO_URL="https://your-repo-url"
BRANCH="main"
PM2_APP_NAME="server.js"

# Navigate to the app directory
cd $APP_DIR

# Pull the latest changes from the repository
git pull origin $BRANCH

# Install dependencies
npm install
 
# Restart the PM2 process
pm2 start $PM2_APP_NAME