#!/bin/bash

# Stop script on first error
set -e

echo "🚀 Starting deployment process..."

# Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo "📝 Changes detected."

    # Prompt for commit message
    echo "Please enter a commit message (Press Enter for default: 'Update tutorial content'):"
    read commit_msg

    # Use default if empty
    if [[ -z "$commit_msg" ]]; then
        commit_msg="Update tutorial content"
    fi

    echo "📦 Committing changes with message: '$commit_msg'..."
    git add .
    git commit -m "$commit_msg"
else
    echo "No changes to commit. Proceeding to deploy..."
fi

echo "🚀 Pushing to main..."
git push origin main

echo "🚀 Building and publishing to the gh-pages branch..."
npm run deploy

echo "✅ Done! Your changes have been pushed to the gh-pages branch."
echo "🌍 It may take a few minutes for the changes to appear online."
