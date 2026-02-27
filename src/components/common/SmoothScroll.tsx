import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

/**
 * Lenis smooth scroll provider.
 * Wraps the entire app inside <BrowserRouter> so it can react to route changes.
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Reset Lenis scroll position on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return <>{children}</>;
};

export default SmoothScroll;
