import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Magnetic from './Magnetic';
import Hero3D from './Hero3D';
import './Hero.css';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Mouse Parallax for Orb
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const orbX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const orbY = useSpring(mouseY, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) * 0.05; // Gentle parallax
            const moveY = (clientY - window.innerHeight / 2) * 0.05;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Floating animation variants
    const floatVariant = {
        animate: {
            y: [0, -10, 0],
            rotateZ: [0, 1, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="hero-section container" ref={containerRef}>
            {/* 3D Interactive Sphere */}
            <div className="hero-orb-container">
                <Hero3D mouseX={mouseX} mouseY={mouseY} />
            </div>

            <motion.div
                className="hero-content"
                style={{ y: y2, opacity }}
            >
                {/* ... badge ... */}
                <div className="badge-container">
                    <motion.div
                        className="live-badge"
                        variants={floatVariant}
                        initial="rest"
                        whileHover="hover"
                        animate="animate"
                    >
                        <motion.span className="pulse-dot"></motion.span>
                        <span className="badge-text-primary">Available for work</span>
                        <motion.span
                            className="badge-text-expanded"
                            initial={{ width: 0, opacity: 0 }}
                            variants={{
                                hover: { width: "auto", opacity: 1, paddingLeft: "0.5rem" },
                                rest: { width: 0, opacity: 0, paddingLeft: 0 }
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}
                        >
                            - Open for Internships & Freelance
                        </motion.span>
                    </motion.div>
                </div>

                <motion.p
                    className="hero-intro"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Hello, I'm
                </motion.p>

                <Magnetic>
                    <motion.h1
                        className="hero-name"
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        data-cursor="hover"
                    >
                        Rajat<br /><span className="hero-name-suffix">Sharma...</span>
                    </motion.h1>
                </Magnetic>

                {/* New Tagline */}
                <motion.p
                    className="hero-tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Frontend Developer building interactive web experiences
                </motion.p>

                <motion.div
                    className="hero-roles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <span>Graphic Designer</span>
                    <span className="separator">+</span>
                    <span>UX/UI Designer</span>
                    <span className="separator">+</span>
                    <span>Frontend Developer</span>
                </motion.div>

                <motion.div
                    className="hero-ctas"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <Magnetic>
                        <Link to="/work" className="cta-link primary" data-cursor="hover" aria-label="View my work">
                            View Work
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link to="/contact" className="cta-link secondary" data-cursor="hover" aria-label="Contact me">
                            Contact Me
                        </Link>
                    </Magnetic>
                </motion.div>
            </motion.div>

            {/* Background Parallax Element - Keeping as secondary noise/texture if needed, or remove if unused */}
            <motion.div
                className="hero-bg-shape"
                style={{ y: y1 }}
            />
        </section>
    );
};

export default Hero;
