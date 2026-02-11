import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisProvider = ({ children }) => {
  const lenisRef = useRef();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    
    // Make lenis available globally
    window.lenis = lenis;

    // Animation frame function
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle route changes - scroll to top smoothly
    const handleRouteChange = () => {
      lenis.scrollTo(0, { immediate: false, duration: 0.8 });
    };

    // Listen for route changes (if using React Router)
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup function
    return () => {
      lenis.destroy();
      window.lenis = null;
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;