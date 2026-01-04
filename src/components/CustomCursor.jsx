import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hasMoved, setHasMoved] = useState(false); // Track if mouse has moved

    useEffect(() => {
        // Only enable on desktop
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const cursor = cursorRef.current;

        // Move cursor logic
        const moveCursor = (e) => {
            // Reveal cursor on first move
            if (!hasMoved) {
                setHasMoved(true);
                gsap.set(cursor, { opacity: 1 });
            }

            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // fast follow
                ease: 'power2.out'
            });
        };

        // Hover logic
        const handleMouseOver = (e) => {
            if (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.dataset.cursor === 'hover'
            ) {
                setIsHovered(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovered(false);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [hasMoved]);

    // Don't render if it's a touch device (handled in useEffect return)
    // but for desktop, we render but hide opacity initially via logic or CSS

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
            style={{ opacity: 0 }} // Start hidden
        />
    );
};

export default CustomCursor;
