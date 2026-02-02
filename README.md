# AI Personas

A web app for creating and chatting with custom AI companions.

## What is this?

AI Personas lets you build your own AI chatbots without writing any code. You give your companion a name, a backstory, some personality traits, and an example conversation—then you (or anyone else) can chat with it.

When you log in, you'll see companions that you and other users have created. You can browse them by category, search by name, or jump straight into a conversation. If you don't find what you're looking for, just create your own.

## What it does

- **Custom companions** – You define the personality, background, and how the AI should talk
- **Conversations** – Chat in real time, powered by OpenAI
- **User accounts** – Sign up and sign in handled by Clerk
- **Avatars** – Upload images for your companions through Cloudinary
- **Search and categories** – Find companions quickly
- **Dark and light themes** – Switch based on your preference

## Built with

This project uses Next.js 16 with the App Router, written in TypeScript. Data lives in a MySQL database accessed through Prisma. Authentication runs through Clerk, images go to Cloudinary, and the chat relies on OpenAI's API. The UI is styled with Tailwind CSS and components from shadcn/ui.

## Getting it running

You'll need Node.js 18 or newer, a MySQL database, plus accounts on Clerk, OpenAI, and Cloudinary.

First, clone the repo and install dependencies:

```bash
git clone <repository-url>
cd ai-personas
npm install
```

Then create a `.env` file in the root with the following:

```env
# Database
DATABASE_URL="mysql://user:password@host:port/database"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# OpenAI
OPENAI_API_KEY=sk-...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

Set up the database:

```bash
npx prisma generate
npx prisma db push
npx ts-node scripts/seed.ts
```

Start the dev server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## How the code is organized

```
app/
├── (auth)/          # Sign-in and sign-up pages
├── (chat)/          # The chat interface
├── (root)/          # Home page and companion creation
├── api/             # Backend API routes
└── hooks/           # Custom React hooks

components/          # Shared UI components
lib/                 # Prisma client and utilities
prisma/              # Database schema
scripts/             # Seed script for initial data
```

## Useful commands

- `npm run dev` – Start the dev server
- `npm run build` – Build for production
- `npm run start` – Run the production build
- `npm run lint` – Check for linting issues
- `npx prisma studio` – Browse your database in a GUI
