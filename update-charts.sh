#!/bin/bash

# This script is used to update the image tag in the values.yaml file of a Helm chart.
# It takes a single argument, which is the new version of the image.
# Usage: ./update-charts.sh <new-version>

# The new version is passed as an argument to the script
NEW_VERSION=$1

# The file to update
FILE="charts/values.yaml"

echo "New version: $NEW_VERSION"
echo "File to update: $FILE"

# Content of the file before the change
cat $FILE

# Use sed to replace the image/tag value
sed -i "s/tag: .*/tag: $NEW_VERSION/" $FILE

# Verify the change
cat $FILE
