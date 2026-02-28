# Fashion.AI | Luxury AI-Powered E-commerce

A Next.js full-stack luxury e-commerce platform featuring AI-generated collections, creator profiles, and a bespoke user experience. Built with a modern technology stack including Next.js App Router, Prisma ORM, and PostgreSQL.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Styling:** Bootstrap 5 & Custom CSS Variables (Glassmorphism & Luxury Aesthetics)
- **Database:** PostgreSQL (Hosted on Supabase)
- **ORM:** Prisma v7
- **Icons:** Lucide React
- **Authentication:** Custom JWT / Context based
- **Language:** TypeScript

---

## 💻 Local Development Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/KamiBreaker/Ai-Ecommerce.git
cd Ai-Ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the Environment Variables

Create a new file named `.env` in the root of the project.

```bash
touch .env
```

Open the `.env` file and add your Supabase database connection string provided by the project owner:

```env
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?pgbouncer=true"
```
*(Note: If you are setting up your own Supabase project from scratch, make sure to use the IPv4 Session Pooler connection string).*

### 4. Sync the Database

To pull the database schema and generate the Prisma Client for your local machine, run:

```bash
npx prisma db push
npx prisma generate
```

### 5. Seed the Database (Optional)

If you are connecting to an empty database and need the mock luxury products and test user accounts, run the seed script:

```bash
npx prisma db seed
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will now be running at [http://localhost:3000](http://localhost:3000).

---

## 🔑 Test Accounts
If the database has been seeded, you can log in with:

**Admin Account:**
- **Email:** `admin@fashion.ai`
- **Password:** `admin123`
*(Grants access to the `/admin` control panel)*

**Creator Account:**
- **Email:** `elena@rose.com`
- **Password:** `creator123`

---

## 🛠️ Project Structure

```text
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Context (Auth, Cart, Catalog)
│   ├── lib/              # Shared utilities (Prisma client)
│   ├── styles/           # Global CSS and custom variables
├── prisma/
│   ├── schema.prisma     # Database models
│   ├── seed.ts           # Mock data populator
```
