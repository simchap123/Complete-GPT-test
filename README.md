# Form Builder Monorepo

This repository contains a simple monorepo setup for a form builder application.

## Packages

- `packages/server` - Node/Express backend with JWT authentication and a sample schema.
- `packages/web` - React frontend configured with Vite and Tailwind CSS.

## Getting Started

```bash
npm install # installs all workspace dependencies
```

### Development

To run the backend:

```bash
cd packages/server
npm run dev
```

To run the frontend:

```bash
cd packages/web
npm run dev
```

Environment variables can be configured using `.env` based on `.env.example`.
