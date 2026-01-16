// Utility function to get the correct upload API URL
// This ensures consistent URL handling across all upload operations
export const getUploadUrl = () => {
    // If VITE_API_URL is explicitly set, use it
    if (import.meta.env.VITE_API_URL) {
        return `${import.meta.env.VITE_API_URL}/upload`;
    }

    // In production (when Vercel deploys), use relative path
    if (import.meta.env.PROD) {
        return '/api/upload';
    }

    // Development fallback
    return 'http://localhost:5000/api/upload';
};
