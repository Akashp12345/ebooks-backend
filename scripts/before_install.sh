#!/bin/bash

# Debugging: Enable verbose output and exit on any error
set -x
set -e

# Debugging: Log current directory and files
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -l

# Stop the existing Node.js application if it is running
if pgrep node > /dev/null
then
  echo "Stopping existing Node.js application..."
  pkill node
else
  echo "No existing Node.js application is running."
fi

# Clean up existing files
echo "Cleaning up existing files in /home/ubuntu/ebooks-backend..."
rm -rf /home/ubuntu/ebooks-backend/* || { echo "Failed to clean up existing files"; exit 1; }

# Install necessary dependencies
echo "Updating package lists..."
sudo apt-get update || { echo "Failed to update package lists"; exit 1; }

echo "Installing Node.js and npm..."
sudo apt-get install -y nodejs npm || { echo "Failed to install Node.js and npm"; exit 1; }

echo "before_install.sh completed successfully."
