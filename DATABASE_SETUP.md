# 🔧 QUICK FIX - Database Setup Required

## Current Error

```
Error [PrismaClientKnownRequestError]: P5010
Cannot fetch data from service: fetch failed
```

**This means**: The database is not set up yet.

---

## ✅ SOLUTION (2 Options)

### Option 1: Use SQLite (Easiest - No Setup Required)

This is the **fastest way** to get started:

1. **Update `prisma/schema.prisma`**:

Change line 9 from:
```prisma
provider = "postgresql"
```

To:
```prisma
provider = "sqlite"
```

2. **Update `.env.local`**:

Change:
```env
DATABASE_URL="postgresql://..."
```

To:
```env
DATABASE_URL="file:./dev.db"
```

3. **Run setup commands**:
```bash
npx prisma db push
npx prisma db seed
```

4. **Refresh browser** - Everything will work!

---

### Option 2: Use PostgreSQL (Production-Ready)

If you want to use PostgreSQL:

1. **Install PostgreSQL** on your computer
   - Download from: https://www.postgresql.org/download/windows/
   - Or use Docker: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=password postgres`

2. **Create database**:
```sql
CREATE DATABASE retail_ecommerce;
```

3. **Update `.env.local`**:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/retail_ecommerce"
```

4. **Run setup**:
```bash
npx prisma db push
npx prisma db seed
```

---

## 🚀 RECOMMENDED: Use SQLite for Now

SQLite is perfect for development and requires **zero setup**. Just:

1. Change `provider` to `"sqlite"` in `prisma/schema.prisma`
2. Change `DATABASE_URL` to `"file:./dev.db"` in `.env.local`
3. Run `npx prisma db push`
4. Run `npx prisma db seed`
5. Refresh browser!

---

## After Setup

You'll have:
- ✅ 13 sample products
- ✅ 7 categories
- ✅ 4 suppliers
- ✅ 1 admin user
- ✅ Fully working e-commerce site!

---

**Choose Option 1 (SQLite) for the quickest start!**
