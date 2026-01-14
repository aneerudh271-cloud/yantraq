# Project Summary: Connect-Serve

## Overview
This is a React-based web application built with Vite, TypeScript, and ShadCN UI components. It appears to be a business website for a company offering products and services, with an admin panel for management.

## Technologies Used
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with ShadCN UI components
- **Routing**: React Router DOM
- **State Management**: React Query (@tanstack/react-query) for data fetching
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Package Manager**: Bun (preferred, but npm used if Bun not available)

## Project Structure
- `src/pages/`: Contains page components (Index, Products, Services, About, Contact, FAQ, Privacy, Terms, Admin, NotFound)
- `src/components/`: Reusable components, including admin, common, layout, and UI components
- `src/data/`: Static data files (company.ts, leads.ts, products.ts, services.ts, testimonials.ts)
- `src/hooks/`: Custom hooks (use-mobile.tsx, use-toast.ts)
- `src/lib/`: Utility functions (utils.ts)

## Key Features
- Multi-page website with routing
- Admin dashboard for managing leads, services, testimonials, and analytics
- Contact forms and WhatsApp integration
- Product and service listings
- Testimonials display
- Responsive design with mobile support

## Setup Instructions
1. Ensure Node.js and npm are installed
2. Clone the repository
3. Run `bun install` (or `npm install` if Bun is not available)
4. Start development server: `npm run dev`
5. Build for production: `npm run build`
6. Preview build: `npm run preview`
7. Lint code: `npm run lint`

## Important Reminders for Future Development
- Update meta tags in `index.html` (title, description, Open Graph tags) to reflect the actual application name and branding
- The project uses ShadCN UI; follow their conventions for adding new components
- Dependencies include many Radix UI primitives; ensure compatibility when updating
- There are 7 vulnerabilities reported by npm audit; consider running `npm audit fix` periodically
- The app uses React Query; configure API endpoints if connecting to a backend
- Admin features are present; ensure proper authentication and authorization in production
- Static data in `src/data/` should be replaced with API calls for dynamic content
- Tailwind CSS is configured; customize `tailwind.config.ts` as needed
- ESLint is set up; maintain code quality standards
- The project is set up for deployment on Lovable; update project ID in README and URLs

## Scripts Available
- `dev`: Start development server
- `build`: Build for production
- `build:dev`: Build in development mode
- `lint`: Run ESLint
- `preview`: Preview production build

## Next Steps
- Connect to a backend API for dynamic data
- Implement user authentication for admin features
- Add environment variables for configuration
- Optimize for performance and SEO
- Add testing framework (e.g., Vitest)