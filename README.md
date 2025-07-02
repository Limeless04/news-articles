# Article CMS

This is a simple Content Management System (CMS) for managing articles, built with [Next.js](https://nextjs.org). It allows you to create, edit, and manage articles and categories through a user-friendly web interface.

## Features

- View a list of articles and categories
- Add, edit, and delete articles
- Manage categories for organizing articles
- User authentication for admin access
- Responsive design for desktop and mobile
- Server-side pagination for articles and categories
- Client-side search and filtering for articles and categories
- Optimistic UI updates and automatic cache revalidation using SWR
- Fallback to local JSON data if the API is unavailable
- TypeScript for type safety across the project
- Modular architecture with reusable hooks and components
- Role-based access control (Admin/User)
- Easy deployment to Vercel or any Next.js-compatible platform

## Libraries Used

This project leverages several modern libraries and tools to provide a robust, scalable, and maintainable CMS:

- **[Next.js](https://nextjs.org/):** The React framework for production, enabling server-side rendering, routing, and API routes.
- **[React](https://react.dev/):** The core UI library for building interactive user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Adds static typing to JavaScript, improving code quality and maintainability.
- **[SWR](https://swr.vercel.app/):** A React Hooks library for remote data fetching, caching, and revalidation, enabling optimistic UI updates and automatic cache management.
- **[Axios](https://axios-http.com/):** Promise-based HTTP client for making API requests.
- **[Next-Themes](https://github.com/pacocoursey/next-themes):** For easy integrated theming in nextjs.
- **Other Utilities:** Custom hooks, helpers, and fallback logic for robust data handling and UI state.

These libraries work together to deliver a seamless, performant, and developer-friendly CMS experience.

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

- `app/` - Main application pages and layouts. Handles routing and page-level logic.
- `components/` - Reusable UI components such as article tables, forms, modals, and grids.
- `lib/` - Utility libraries and helpers, including API helpers, category/article utilities, and fallback logic.
- `hooks/` - Custom React hooks for data fetching and state management (e.g., `useArticles`, `useCategories`).
- `providers/` - Context providers for global state management (such as authentication or theme).
- `public/` - Static assets (images, icons, etc.) served directly by Next.js.
- `data/` - Static JSON files used as fallback data when the API is unavailable (e.g., `articles.json`, `categories.json`).
- `styles/` - Global and component-level CSS or SCSS files for styling the application.
- `utils/` - General utility functions for formatting, validation, and other helpers.
- `types/` - TypeScript type definitions and interfaces shared across the project.

## Deployment

You can easily deploy this project on [Vercel](https://vercel.com/) or any platform that supports Next.js.

## Live preview

You can check the live preview of this website at [ArticleCMS](https://cms.bitecode.my.id)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Platform](https://vercel.com/)

---

Feel free to customize and extend this CMS to fit your needs!
