# 🚀 Deployment Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (if installed)
```bash
gh repo create happynest-celebrations --public --source=. --remote=origin --push
```

### Option B: Using GitHub Website
1. Go to https://github.com/new
2. Repository name: `happynest-celebrations` (or any name you prefer)
3. Set to **Public** (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, run these commands:

```bash
cd /Users/kuldeeptamrakar/happynest-celebrations

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/happynest-celebrations.git

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. The GitHub Actions workflow will automatically deploy your site

## Step 4: Access Your Website

After the first deployment (usually takes 2-3 minutes):
- Your site will be available at: `https://YOUR_USERNAME.github.io/happynest-celebrations/`
- You can check deployment status in the **Actions** tab

## ✅ That's It!

Your website will automatically deploy on every push to the `main` branch.

