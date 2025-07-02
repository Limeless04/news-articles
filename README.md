# Article CMS

This is a simple Content Management System (CMS) for managing articles, built with [Next.js](https://nextjs.org). It allows you to create, edit, and manage articles and categories through a user-friendly web interface.

## Features

- View a list of articles and categories
- Add, edit, and delete articles
- Manage categories for organizing articles
- User authentication for admin access
- Responsive design for desktop and mobile

## Getting Started

To run the project locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

You can start editing the main page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

- `app/` - Main application pages and layouts
- `components/` - Reusable UI components (e.g., article tables, grids)
- `lib/` - Utility libraries and helpers
- `hooks/` - Custom React hooks
- `providers/` - Context providers for state management
- `public/` - Static assets (images, icons, etc.)

## Deployment

You can easily deploy this project on [Vercel](https://vercel.com/) or any platform that supports Next.js.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Platform](https://vercel.com/)

---

Feel free to customize and extend this CMS to fit your needs!