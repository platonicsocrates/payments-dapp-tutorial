#!/bin/bash

# Temporary backup directory
backupDir="./backup_for_commits"
mkdir -p "$backupDir" # Create backup directory if it doesn't exist

# Exclude paths and files in the find command directly
find . -type f \( ! -iname ".gitignore" ! -iname "package.json" ! -iname "yarn.lock" ! -iname "tsconfig.json" ! -iname "babel.config.js" ! -iname ".eslintrc.js" ! -iname "README.md" ! -iname "nginx.conf" ! -path './.git/*' ! -path "./$backupDir/*" ! -path './.idea/*' ! -path './node_modules/*' \) -print0 | while IFS= read -r -d $'\0' file; do
    
    echo "Processing file: $file"

    # Create a backup of the current file
    backupFile="$backupDir/$(basename "$file")"
    cp "$file" "$backupFile"
    
    # Clear the file content temporarily if necessary
    > "$file"

    # Read the backup file line by line
    while IFS= read -r line; do
        echo "$line" >> "$file" # Append the current line for a cumulative build-up

