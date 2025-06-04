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
Add `SUPABASE_URL` and `SUPABASE_KEY` to connect the backend to your Supabase
project.

## Form Builder UI

The frontend now includes a basic drag-and-drop form builder using `react-beautiful-dnd`. Fields can be rearranged and configured with conditional visibility rules. Start the web server and navigate to `localhost:5173` to try it out.

## Database Extensions

Additional tables are provided for approval workflows and audit logs. Migrations can be found in `packages/server/db`.

