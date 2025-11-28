# E-Commerce Platform - Quick Setup Script

Write-Host "🚀 Starting E-Commerce Platform Setup..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if .env.local exists
if (!(Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Created .env.local - Please update with your actual values!" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Update these values in .env.local:" -ForegroundColor Red
    Write-Host "  - DATABASE_URL (your PostgreSQL connection string)" -ForegroundColor Yellow
    Write-Host "  - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter after updating .env.local to continue"
}

# Step 2: Install dependencies (if needed)
Write-Host "📦 Checking dependencies..." -ForegroundColor Cyan
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}
Write-Host ""

# Step 3: Generate Prisma Client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate
Write-Host "✅ Prisma Client generated" -ForegroundColor Green
Write-Host ""

# Step 4: Push database schema
Write-Host "🗄️  Setting up database..." -ForegroundColor Cyan
$response = Read-Host "Do you want to push the database schema? (y/n)"
if ($response -eq "y") {
    npx prisma db push
    Write-Host "✅ Database schema created" -ForegroundColor Green
} else {
    Write-Host "⏭️  Skipped database push" -ForegroundColor Yellow
}
Write-Host ""

# Step 5: Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
$response = Read-Host "Do you want to seed the database with sample data? (y/n)"
if ($response -eq "y") {
    npx prisma db seed
    Write-Host "✅ Database seeded with sample data" -ForegroundColor Green
    Write-Host ""
    Write-Host "Default Admin Credentials:" -ForegroundColor Cyan
    Write-Host "  Email: admin@retailstore.com" -ForegroundColor Yellow
    Write-Host "  Password: admin123" -ForegroundColor Yellow
    Write-Host "  ⚠️  CHANGE THESE IMMEDIATELY IN PRODUCTION!" -ForegroundColor Red
} else {
    Write-Host "⏭️  Skipped database seeding" -ForegroundColor Yellow
}
Write-Host ""

# Step 6: Summary
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "  2. Visit http://localhost:3000 for the storefront" -ForegroundColor White
Write-Host "  3. Visit http://localhost:3000/admin for the admin dashboard" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  - README.md - Project overview" -ForegroundColor White
Write-Host "  - PROJECT_SUMMARY.md - Current status and next steps" -ForegroundColor White
Write-Host "  - IMPLEMENTATION_GUIDE.md - Detailed implementation guide" -ForegroundColor White
Write-Host "  - DEPLOYMENT_GUIDE.md - Deployment instructions" -ForegroundColor White
Write-Host ""

$response = Read-Host "Would you like to start the development server now? (y/n)"
if ($response -eq "y") {
    Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
    npm run dev
}
