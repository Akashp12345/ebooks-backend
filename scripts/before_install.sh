#!/bin/bash

# Stop the existing PM2 process
pm2 stop server || true

# Remove any temporary files or logs
# For example:
# rm -rf /path/to/your/application/tmp/*

# Additional cleanup steps as needed
