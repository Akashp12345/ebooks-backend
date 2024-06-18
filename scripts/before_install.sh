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

# Update package lists
echo "Updating package lists..."
sudo apt-get update || { echo "Failed to update package lists"; exit 1; }

# Fix broken packages
echo "Fixing broken packages..."
sudo apt-get install -f || { echo "Failed to fix broken packages"; exit 1; }

# Clean up local repository
echo "Cleaning up local repository..."
sudo apt-get clean || { echo "Failed to clean local repository"; exit 1; }

# Install Node.js and npm using NodeSource
echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash - || { echo "Failed to add NodeSource repository"; exit 1; }
sudo apt-get install -y nodejs || { echo "Failed to install Node.js and npm"; exit 1; }

echo "before_install.sh completed successfully."
