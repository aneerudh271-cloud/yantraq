# YantraQ - IT Hardware Sales & Service Platform

This is a full-stack web application for YantraQ, featuring a public-facing website for browsing products/services and an admin dashboard for content management.

## Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React (Icons)
- Framer Motion (Animations)
- React Query (State Management)
- React Router DOM
- React Helmet Async (SEO)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- Environment Variables (dotenv)

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Community Server (running locally) or Atlas URI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd yantraq
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory (if not exists) and add:
   ```env
   MONGODB_URI=mongodb://localhost:27017/yantraq
   PORT=5000
   ```

### Running the Application

1. **Start MongoDB**
   Ensure your MongoDB server is running.

2. **Run both Frontend and Backend**
   The project is set up to run both concurrently (dev mode).
   ```bash
   npm run dev
   ```
   Or if you want to run the server only:
   ```bash
   npm run server
   ```

### Project Structure
- `/src`: Frontend React application
- `/server`: Backend Express application
- `/public`: Static assets

## Features
- **Product Management**: CRUD operations for products (Admin)
- **Service Management**: CRUD operations for services (Admin)
- **Lead Management**: Track enquiries and status (Admin)
- **Analytics**: Basic dashboard for leads and enquiry types (Admin)
- 
- **Public Website**:
  - Responsive landing page
  - Product catalog with filtering
  - Service listings
  - Contact forms
  - SEO optimization

## Deployment

### Vercel (Recommended)
This project is configured for Vercel deployment.
1. Push to GitHub.
2. Import project in Vercel.
3. Vercel will auto-detect the configuration (`vercel.json`).
4. Set Environment Variables (`MONGODB_URI`, `SMTP_...`, `CLIENT_URL`).

### Manual Deployment
- **Frontend**: `npm run build` -> `dist/`
- **Backend**: `npm run server`

### Full Stack Setup
For best performance, we recommend:
1. **Backend**: Render or Railway (Node.js)
2. **Frontend**: Vercel (Static)
   - Set `VITE_API_URL` to your Backend URL.

## License
MIT
