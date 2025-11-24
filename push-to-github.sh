#!/bin/bash

# Script to push HappyNest Celebrations to GitHub

echo "🚀 HappyNest Celebrations - GitHub Push Script"
echo ""

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo "✅ Remote 'origin' already exists"
    echo "📍 Current remote: $(git remote get-url origin)"
    echo ""
    read -p "Do you want to push to existing remote? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📤 Pushing to GitHub..."
        git push -u origin main
        echo ""
        echo "✅ Push complete!"
        echo ""
        echo "📝 Next steps:"
        echo "   1. Go to your repository on GitHub"
        echo "   2. Settings → Pages"
        echo "   3. Source: Select 'GitHub Actions'"
        echo "   4. Save and wait 2-3 minutes for deployment"
        exit 0
    fi
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Username cannot be empty"
    exit 1
fi

# Repository name
REPO_NAME="happynest-celebrations"

echo ""
echo "📦 Repository: $GITHUB_USERNAME/$REPO_NAME"
echo ""
read -p "Create this repository on GitHub first, then press Enter to continue..."
echo ""

# Add remote
echo "🔗 Adding remote..."
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git" 2>/dev/null || \
git remote set-url origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Push
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📝 Next Steps:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
    echo ""
    echo "2. Under 'Source', select: GitHub Actions"
    echo ""
    echo "3. Save and wait 2-3 minutes"
    echo ""
    echo "4. Your site will be live at:"
    echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
    echo ""
    echo "5. Check deployment status:"
    echo "   https://github.com/$GITHUB_USERNAME/$REPO_NAME/actions"
    echo ""
else
    echo ""
    echo "❌ Push failed. Make sure:"
    echo "   • Repository exists on GitHub"
    echo "   • Repository is PUBLIC (required for free GitHub Pages)"
    echo "   • You have push access"
    echo ""
    echo "Create repository at: https://github.com/new"
fi

