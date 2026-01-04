import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './Navigation';
import CustomCursor from './CustomCursor';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    const lenisRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Scroll to top on route change IS HANDLED by AnimatePresence mode usually, 
    // but we keep explicit scroll reset for safety with Lenis
    useEffect(() => {
        if (lenisRef.current) {
            // slight delay to allow exit animation to start/finish
            setTimeout(() => {
                lenisRef.current.scrollTo(0, { immediate: true });
            }, 500); // sync with exit duration
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return (
        <div className="app-container">
            <CustomCursor />
            <Navigation />

            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ minHeight: '100vh' }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
