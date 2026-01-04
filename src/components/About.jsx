import './About.css';

const About = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-grid">
                <div className="about-content">
                    <h2 className="section-title">
                        About <span className="text-dim">Me</span>
                    </h2>
                    <p className="about-text">
                        I am a multidisciplinary developer focused on crafting immersive web experiences.
                        With a background in engineering and a passion for design, I bridge the gap between
                        technical complexity and visual elegance.
                    </p>
                    <p className="about-text">
                        Currently exploring the intersection of 3D web technologies, generative art, and
                        system architecture.
                    </p>

                    <div className="about-footer">
                        <a href="#" className="download-resume">
                            Download Resume
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                                <path d="M6 1L6 11M6 11L1 6M6 11L11 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="about-visuals">
                    <div className="portrait-container">
                        <div className="portrait-image">
                            <div className="noise-overlay-local"></div>
                        </div>
                    </div>

                    <div className="now-playing-widget">
                        <div className="rotating-text-container">
                            <svg viewBox="0 0 100 100" width="100" height="100">
                                <defs>
                                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                </defs>
                                <text fontSize="11">
                                    <textPath xlinkHref="#circle">
                                        • NOW PLAYING • NOW PLAYING
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                        <div className="album-art"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
