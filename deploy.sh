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

echo "✅ Done! GitHub Actions will build and deploy the site to GitHub Pages."
echo "🌍 Follow the progress at https://github.com/SynthesisAI-Lab/synthesisai-lab.github.io/actions"
