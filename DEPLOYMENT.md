# Deployment Guide for CarbonMax Chat API

## Problem
GitHub Pages only serves static files, so Next.js API routes (like `/api/chat`) don't work. The 405 error occurs because GitHub Pages cannot execute server-side code.

## Solution
We've created a separate Vercel serverless function to handle the chat API. This allows the API to work independently of the static site hosting.

## Setup Instructions

### 1. Deploy the API to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy the API function**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to your existing project or create a new one
   - Confirm the project settings

3. **Set the Environment Variable**:
   - Go to your Vercel project dashboard: https://vercel.com/dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add `CLAUDE_API_KEY` with your Claude API key value
   - Make sure it's set for **Production**, **Preview**, and **Development** environments

4. **Redeploy** (if needed):
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Select **Redeploy**

### 2. Update Your Frontend

After deploying to Vercel, you'll get a URL like: `https://your-project.vercel.app`

1. **Create/Update `.env.local`** (for local development):
   ```env
   NEXT_PUBLIC_API_URL=https://your-project.vercel.app/api/chat
   ```

2. **For GitHub Pages deployment**, update the GitHub Actions workflow or set the environment variable in your build process.

   Option A: Add to `.github/workflows/nextjs.yml` build step:
   ```yaml
   - name: Build with Next.js
     run: ${{ steps.detect-package-manager.outputs.runner }} next build
     env:
       NEXT_PUBLIC_API_URL: https://your-project.vercel.app/api/chat
   ```

   Option B: Add as a GitHub Secret:
   - Go to your GitHub repository
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Add a new repository secret: `NEXT_PUBLIC_API_URL` = `https://your-project.vercel.app/api/chat`
   - Update the workflow to use it:
     ```yaml
     - name: Build with Next.js
       run: ${{ steps.detect-package-manager.outputs.runner }} next build
       env:
         NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
     ```

### 3. Alternative: Use Vercel for Full Deployment

If you prefer, you can deploy the entire Next.js app to Vercel instead of GitHub Pages:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Set `CLAUDE_API_KEY` in Vercel environment variables
4. The API routes will work automatically

## File Structure

```
.
├── api/
│   └── chat.ts          # Vercel serverless function
├── app/
│   └── chat/
│       └── page.tsx     # Updated to use NEXT_PUBLIC_API_URL
├── vercel.json          # Vercel configuration
└── .env.local           # Local environment variables (not committed)
```

## Testing

1. **Local Development**:
   - Run `npm run dev`
   - The app will use `/api/chat` (local Next.js API route) if `NEXT_PUBLIC_API_URL` is not set
   - Or set `NEXT_PUBLIC_API_URL` to your Vercel function URL

2. **Production**:
   - Make sure `NEXT_PUBLIC_API_URL` is set to your Vercel function URL
   - The chat should work on GitHub Pages

## Troubleshooting

- **405 Method Not Allowed**: Make sure the Vercel function is deployed and the URL is correct
- **API Key Error**: Verify `CLAUDE_API_KEY` is set in Vercel environment variables
- **CORS Errors**: The serverless function includes CORS headers, but if issues persist, check the function logs in Vercel

