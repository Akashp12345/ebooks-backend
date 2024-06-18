#!/bin/bash

# Stop the existing Node.js application
pkill node || true

# Clean up existing files
rm -rf /home/ubuntu/ebooks-backend/*

# Install necessary dependencies
sudo apt-get update
sudo apt-get install -y nodejs npm
