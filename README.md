# 📦 Product Manager Backend

## This is a simple backend API built with Express, TypeScript, and Prisma ORM connected to a MySQL database.It handles user authentication and product management.

---

## Tech Stack

Node.js

Express.js

TypeScript

Prisma ORM

MySQL

Zod (schema validation)

bcrypt.js (password hashing)

## JWT (authentication)

## 🔧 Setup Instructions

Clone the repository

```bash
git clone https://github.com/your-username/product-manager-backend.git
cd product-manager-backend
```

Install dependencies

```bash
npm install
```

Configure environment variables

Create a .env file at the root with:

```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret"
PORT=3001
```

Set up the database

```bash
npm run setup
```

This will:

- Reset the database
- Run migrations
- Generate Prisma client
- Start the server

Run in development mode

```bash
npm run dev
```

## Server will start at: http://localhost:3001

## Available API Endpoints

... WORKING ON IT

## Useful Scripts

Script
Description

```bash
npm run dev
```

Start server with live reload (dev mode)

```bash
npm run setup
```

Reset database, generate Prisma, and start dev server

Author:
Cesar Quintero
