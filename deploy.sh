#!/bin/bash

# Variables
APP_DIR="/home/ubuntu/ebooks-backend"
BRANCH="main"
PM2_APP_NAME="server.js"
DESIRED_NAME="server"

# Navigate to the app directory
cd $APP_DIR || exit

# Pull the latest changes from the repository
git pull origin $BRANCH

# Install dependencies
npm install

# Check if the process is already running
if ! pm2 describe "$PM2_APP_NAME" &> /dev/null; then
    # If not running, start the process with the desired name
    pm2 start "$PM2_APP_NAME" --name "$DESIRED_NAME"
else
    # If running, restart the process
    pm2 restart "$DESIRED_NAME"
fi

# Save the current process list
pm2 save
