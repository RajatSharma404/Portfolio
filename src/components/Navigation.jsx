import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navigation.css';

const Navigation = () => {
    const location = useLocation();
    const isFrench = location.pathname.startsWith('/fr');
    const [theme, setTheme] = useState(localStorage.getItem('portfolio_theme') || 'dark');

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <nav className="navigation">
            <div className="container nav-container">
                <div className="nav-left">
                    <Link to="/" className="nav-logo">
                        Portfolio
                    </Link>
                </div>

                <div className="nav-right">
                    <div className="nav-links">
                        <NavLink to="/work" className="nav-link">Work</NavLink>
                        <NavLink to="/about" className="nav-link">About</NavLink>
                        <NavLink to="/contact" className="nav-link">Contact</NavLink>
                    </div>

                    <div className="nav-controls">
                        <div className="theme-toggle" onClick={toggleTheme} data-cursor="hover" title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
                            {theme === 'light' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"/>
                                    <line x1="12" y1="1" x2="12" y2="3"/>
                                    <line x1="12" y1="21" x2="12" y2="23"/>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                    <line x1="1" y1="12" x2="3" y2="12"/>
                                    <line x1="21" y1="12" x2="23" y2="12"/>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
