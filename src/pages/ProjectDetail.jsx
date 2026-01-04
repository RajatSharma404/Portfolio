import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectDetail.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
    const { id } = useParams();
    const containerRef = useRef(null);
    const heroImageRef = useRef(null); // Ref slightly redundant with motion but kept for GSAP parallax if needed

    // Mock Data based on ID (In real app, fetch from data source)
    const projectTitle = id ? id.replace(/-/g, ' ') : 'Project Title';

    // For demo purposes, matching the likely image from the grid based on ID or using a default
    // In a real app, you'd fetch the same image URL.
    const image = "https://images.unsplash.com/photo-1493514789931-5f7513b947f5?q=80&w=2340&auto=format&fit=crop";

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(heroImageRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Gallery Image Reveals
            const images = document.querySelectorAll('.gallery-image-wrapper');
            images.forEach((imgWrapper) => {
                gsap.fromTo(imgWrapper.querySelector('img'),
                    { scale: 1.1, opacity: 0.8 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: imgWrapper,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, containerRef);
        return () => ctx.revert();
    }, [id]);

    return (
        <div className="page-project-detail" ref={containerRef}>
            <div className="project-hero">
                <div className="hero-image-container">
                    <motion.img
                        layoutId={`project-image-${id}`}
                        src={image}
                        alt={projectTitle}
                        className="hero-image"
                        loading="eager"
                        decoding="sync"
                    />
                </div>
                <div className="container project-header">
                    <h1 className="project-detail-title">{projectTitle}</h1>
                </div>
            </div>

            <div className="container project-content">
                <div className="project-meta">
                    <div className="meta-group">
                        <span className="meta-label">Role</span>
                        <span className="meta-value">Design & Dev</span>
                    </div>
                    <div className="meta-group">
                        <span className="meta-label">Year</span>
                        <span className="meta-value">2023</span>
                    </div>
                    <div className="meta-group">
                        <span className="meta-label">Tools</span>
                        <span className="meta-value">Figma, React, GSAP</span>
                    </div>
                </div>

                <div className="project-description">
                    <div className="case-study-section">
                        <h3>The Challenge</h3>
                        <p>
                            The goal was to create a digital experience that stands out in a crowded market.
                            We needed to balance high-end aesthetics with accessible usability, ensuring that
                            users could navigate the complex catalog without feeling overwhelmed.
                        </p>
                    </div>

                    <div className="case-study-section">
                        <h3>The Process</h3>
                        <p>
                            We started with a deep dive into the brand's core values: minimalism, precision,
                            and timelessness. Using Figma, we iterated on interactions that felt "weighty" and
                            deliberate. The development phase utilized React for component modularity and
                            GSAP for frame-perfect animations.
                        </p>
                    </div>

                    <div className="case-study-section">
                        <h3>The Solution</h3>
                        <p>
                            The final product is a seamless single-page application that feels more like an
                            interactive art piece. By using WebGL for product views and locomotive-scroll
                            for the layout, we achieved a sense of depth and immersion rarely seen in e-commerce.
                        </p>
                    </div>
                </div>
            </div>

            <div className="project-gallery container">
                <div className="gallery-image-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                        alt="Project screenshot showing detailed view"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="gallery-image-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                        alt="Project screenshot showing mobile view"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>

            <div className="next-project container">
                <p>Next Project</p>
                <div className="next-project-title-wrapper" data-cursor="hover">
                    <h2 className="next-project-title">Abstract Form</h2>
                    <span className="arrow-icon">→</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
