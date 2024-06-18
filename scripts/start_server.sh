#!/bin/bash

# Perform a health check on your application
# For example, send a request to an endpoint and check the response
# If the response is as expected, the service is considered healthy
curl -f http://localhost:5000/health || exit 1
