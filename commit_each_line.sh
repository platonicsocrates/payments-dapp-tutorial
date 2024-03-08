#!/bin/bash

# Temporary backup directory
backupDir="./backup_for_commits"
mkdir -p "$backupDir" # Create backup directory if it doesn't exist

# Exclude paths and files in the find command directly
