# Deployment Guide for CarbonMax

This guide covers deploying CarbonMax to Vercel, the recommended platform for Next.js applications.

## 🚀 Deploy to Vercel

Vercel is the easiest and most seamless way to deploy Next.js applications. It provides:
- Automatic deployments from GitHub
- Serverless functions for API routes
- Built-in environment variable management
- Automatic HTTPS and CDN

### Quick Start

1. **Connect Your Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New Project**
   - Import your GitHub repository: `onsenix12/carbon-max-app`
   - Vercel will automatically detect Next.js

2. **Configure Environment Variables**
   - In the project settings, go to **Environment Variables**
   - Add `CLAUDE_API_KEY` with your Claude API key
   - Make sure it's set for **Production**, **Preview**, and **Development** environments

3. **Deploy**
   - Click **Deploy**
   - Vercel will build and deploy your app automatically
   - Your app will be live at `https://your-project.vercel.app`

### Environment Variables

Required environment variables:

```env
CLAUDE_API_KEY=your_claude_api_key_here
```

**To set in Vercel:**
1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the variable for all environments (Production, Preview, Development)
4. Redeploy if needed

### Automatic Deployments

Once connected to GitHub, Vercel will:
- Automatically deploy on every push to `master`/`main` branch
- Create preview deployments for pull requests
- Run builds automatically

### Manual Deployment with Vercel CLI

If you prefer using the CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Project Structure

Vercel automatically detects:
- Next.js App Router (`app/` directory)
- API routes (`app/api/` directory)
- Environment variables from `.env.local` (for local development)

### File Structure

```
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # Serverless function
│   └── ...
├── vercel.json              # Vercel configuration
└── .env.local              # Local environment variables (not committed)
```

### API Routes

All API routes in `app/api/` automatically become Vercel serverless functions:
- `/api/chat` → Serverless function
- No additional configuration needed
- Automatic scaling and cold start optimization

### Custom Domain

To add a custom domain:
1. Go to **Settings** → **Domains**
2. Add your domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

### Monitoring & Analytics

Vercel provides:
- **Deployment logs** - View build and deployment logs
- **Function logs** - Monitor API route execution
- **Analytics** - Optional performance monitoring
- **Speed Insights** - Web vitals tracking

### Troubleshooting

**Build Failures:**
- Check deployment logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure Node.js version is compatible (20+)

**API Route Issues:**
- Verify `CLAUDE_API_KEY` is set in environment variables
- Check function logs in Vercel dashboard
- Ensure API route is in `app/api/` directory

**Environment Variables Not Working:**
- Make sure variables are set for the correct environment
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

### Local Development

For local development:

1. Create `.env.local`:
   ```env
   CLAUDE_API_KEY=your_claude_api_key_here
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Test API routes locally at `http://localhost:3000/api/chat`

### Production Checklist

- [ ] Repository connected to Vercel
- [ ] `CLAUDE_API_KEY` environment variable set
- [ ] Build completes successfully
- [ ] API routes working correctly
- [ ] Custom domain configured (if needed)
- [ ] Analytics enabled (optional)

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs) or [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
