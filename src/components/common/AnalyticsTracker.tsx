import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '@/lib/api';

export const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const trackPageView = async () => {
            try {
                // Determine if we should track this path (e.g. ignore /admin)
                if (location.pathname.startsWith('/admin')) return;

                await api.post('/analytics/track', {
                    path: location.pathname,
                    userAgent: navigator.userAgent
                });
            } catch (error) {
                console.error('Failed to track page view:', error);
            }
        };

        trackPageView();
    }, [location]);

    return null;
};
