#!/bin/bash

echo "🚀 Push to GitHub - kuldeepjaanvi account"
echo ""
echo "Before running this, make sure:"
echo "  1. Repository exists: https://github.com/kuldeepjaanvi/happynest-celebrations"
echo "  2. Repository is PUBLIC"
echo ""
read -p "Press Enter when ready..."

echo ""
echo "Enter your GitHub Personal Access Token:"
echo "(Get it from: https://github.com/settings/tokens/new)"
echo ""
read -s GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token cannot be empty"
    exit 1
fi

echo ""
echo "📤 Pushing to GitHub..."

# Update remote with token
git remote set-url origin "https://${GITHUB_TOKEN}@github.com/kuldeepjaanvi/happynest-celebrations.git"

# Push
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed!"
    echo ""
    echo "📝 Next: Enable GitHub Pages"
    echo "   → https://github.com/kuldeepjaanvi/happynest-celebrations/settings/pages"
    echo "   → Source: Select 'GitHub Actions'"
    echo "   → Save"
    echo ""
    echo "🌐 Your site will be at:"
    echo "   https://kuldeepjaanvi.github.io/happynest-celebrations/"
else
    echo ""
    echo "❌ Push failed. Check:"
    echo "   • Repository exists and is PUBLIC"
    echo "   • Token has 'repo' permissions"
    echo "   • Token is valid"
fi

