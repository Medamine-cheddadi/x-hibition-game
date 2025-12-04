# Deployment Guide for GitHub Pages

Follow these steps to deploy your Graph Cycle Challenge app to GitHub Pages.

## Step 1: Configure Git (if not already done)

Set your Git identity:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Or set it only for this repository:
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 2: Create Initial Commit

```bash
git commit -m "Initial commit: Graph Cycle Challenge app with touch-based drawing and 10 challenging levels"
```

## Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it `xhibition` (or your preferred name)
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 4: Push to GitHub

Replace `yourusername` with your GitHub username:

```bash
git remote add origin https://github.com/yourusername/xhibition.git
git push -u origin main
```

If you named your repository differently, update the URL accordingly.

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **"GitHub Actions"**
5. The workflow will automatically run and deploy your site

## Step 6: Access Your Deployed Site

After the GitHub Actions workflow completes (usually 1-2 minutes), your site will be available at:

```
https://yourusername.github.io/xhibition/
```

You can find the exact URL in:
- Repository → Settings → Pages
- Or in the Actions tab after deployment completes

## Important Notes

### If Your Repository Name is Different

If you named your repository something other than `xhibition`, you need to update the base path in `vite.config.ts`:

```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

### Updating the Deployment

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your app
2. Deploy it to GitHub Pages

No manual steps needed!

### Troubleshooting

- **Build fails**: Check the Actions tab for error messages
- **Site not loading**: Make sure GitHub Pages is enabled and set to "GitHub Actions"
- **404 errors**: Verify the base path in `vite.config.ts` matches your repository name

## Local Testing Before Deployment

Test the production build locally:

```bash
npm run build
npm run preview
```

This will show you exactly how it will look when deployed.

