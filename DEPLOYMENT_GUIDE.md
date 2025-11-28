# Deployment Guide - Vercel + Database Setup

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Database provider account (Neon or PlanetScale)
- Razorpay account
- Uploadthing account

## Step 1: Database Setup (Using Neon)

### 1.1 Create Neon Database

1. Go to [Neon.tech](https://neon.tech)
2. Sign up / Log in
3. Click "Create Project"
4. Choose region (closest to your users - Mumbai/Singapore for India)
5. Name your project: `retail-ecommerce-prod`
6. Copy the connection string

### 1.2 Configure Database URL

Your connection string will look like:
```
postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

## Step 2: Environment Variables Setup

Create a `.env.local` file with all required variables:

```env
# Database
DATABASE_URL="your-neon-connection-string"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="generate-with-command-below"

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_xxxxx"
RAZORPAY_KEY_SECRET="your_secret_key"

# Uploadthing
UPLOADTHING_SECRET="sk_live_xxxxx"
UPLOADTHING_APP_ID="your_app_id"

# Email (Optional - for OTP)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourstore.com"

# App Settings
NEXT_PUBLIC_APP_NAME="Your Store Name"
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NEXT_PUBLIC_ADMIN_EMAIL="admin@yourstore.com"

# Shipping
SHIPPING_RATE_PER_KG=50
FREE_SHIPPING_THRESHOLD=5000
```

### Generate NEXTAUTH_SECRET

Run this command:
```bash
openssl rand -base64 32
```

## Step 3: Razorpay Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up for account
3. Complete KYC verification
4. Go to Settings → API Keys
5. Generate Live Keys (use Test keys for testing)
6. Copy Key ID and Secret
7. Add to environment variables

### Test Mode vs Live Mode

- **Test Mode**: Use for development
  - Key ID starts with `rzp_test_`
  - No real money transactions
  
- **Live Mode**: Use for production
  - Key ID starts with `rzp_live_`
  - Requires KYC completion
  - Real money transactions

## Step 4: Uploadthing Setup

1. Go to [Uploadthing](https://uploadthing.com)
2. Sign up / Log in
3. Create new app
4. Copy App ID and Secret
5. Add to environment variables

## Step 5: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - E-commerce platform"

# Create repository on GitHub
# Then add remote and push
git remote add origin https://github.com/yourusername/retail-ecommerce.git
git branch -M main
git push -u origin main
```

## Step 6: Deploy to Vercel

### 6.1 Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository

### 6.2 Configure Project

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)

### 6.3 Add Environment Variables

In Vercel project settings:
1. Go to "Settings" → "Environment Variables"
2. Add all variables from your `.env.local`
3. Make sure to add them for all environments (Production, Preview, Development)

### 6.4 Deploy

1. Click "Deploy"
2. Wait for build to complete (3-5 minutes)
3. Your site will be live at `your-project.vercel.app`

## Step 7: Database Migration

After first deployment:

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

### Option B: Using Prisma Studio

```bash
# Set DATABASE_URL to production database
# Then run:
npx prisma db push
npx prisma db seed
```

## Step 8: Custom Domain (Optional)

1. Go to Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

## Step 9: Post-Deployment Checklist

- [ ] Verify database connection
- [ ] Test user registration/login
- [ ] Test product browsing
- [ ] Test cart functionality
- [ ] Test checkout flow
- [ ] Test Razorpay payment (use test mode first)
- [ ] Test file uploads
- [ ] Test admin dashboard access
- [ ] Verify email notifications (if configured)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Set up error monitoring (Sentry recommended)
- [ ] Set up analytics (Google Analytics/Vercel Analytics)

## Step 10: Create Admin User

After deployment, create admin user via Prisma Studio:

```bash
npx prisma studio
```

Or run seed script:
```bash
npx prisma db seed
```

Default admin credentials (from seed):
- Email: `admin@retailstore.com`
- Password: `admin123`

**⚠️ IMPORTANT**: Change this password immediately after first login!

## Monitoring & Maintenance

### Vercel Analytics

1. Enable in Vercel dashboard
2. Monitor page views, performance
3. Track Core Web Vitals

### Error Tracking

Recommended: Sentry
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Database Backups

Neon provides automatic backups:
- Go to Neon dashboard
- Navigate to your project
- Check "Backups" section
- Configure backup retention

## Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Verify all environment variables are set
3. Ensure `DATABASE_URL` is accessible
4. Check for TypeScript errors

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check if IP is whitelisted (Neon allows all by default)
3. Ensure SSL mode is enabled
4. Test connection locally first

### Payment Not Working

1. Verify Razorpay keys are correct
2. Check if using test/live keys appropriately
3. Ensure webhook URLs are configured
4. Check Razorpay dashboard for errors

### Images Not Uploading

1. Verify Uploadthing credentials
2. Check file size limits
3. Ensure correct CORS settings
4. Check browser console for errors

## Scaling Considerations

### Database

- Neon Free Tier: 0.5 GB storage, 10 GB transfer
- Upgrade to Pro for more resources
- Consider connection pooling for high traffic

### Vercel

- Free Tier: 100 GB bandwidth
- Upgrade to Pro for more bandwidth
- Enable Edge Functions for better performance

### CDN

- Use Vercel's built-in CDN
- Consider Cloudflare for additional caching
- Optimize images with Next/Image

## Security Checklist

- [ ] Change default admin password
- [ ] Enable HTTPS only
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize user inputs
- [ ] Use environment variables for secrets
- [ ] Enable Vercel's security headers
- [ ] Regular dependency updates
- [ ] Monitor for vulnerabilities

## Support

For issues:
1. Check Vercel deployment logs
2. Check Neon database logs
3. Review Next.js documentation
4. Contact support if needed

## Cost Estimate (Monthly)

- **Vercel**: Free tier (or $20/month Pro)
- **Neon**: Free tier (or $19/month for 3GB)
- **Uploadthing**: Free tier (or $10/month)
- **Razorpay**: 2% transaction fee
- **Domain**: ~$10-15/year

**Total**: Can start with $0/month (free tiers) or ~$50/month for production-ready setup.
