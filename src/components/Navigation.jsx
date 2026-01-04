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
                        <div className="theme-toggle" onClick={toggleTheme} data-cursor="hover">
                            <span className={`theme-option ${theme === 'light' ? 'active' : ''}`}>Light</span>
                            <span className="separator">/</span>
                            <span className={`theme-option ${theme === 'dark' ? 'active' : ''}`}>Dark</span>
                        </div>

                        <div className="vertical-separator"></div>

                        <div className="lang-toggle">
                            <span className={`lang-option ${!isFrench ? 'active' : ''}`}>EN</span>
                            <span className="separator">/</span>
                            <span className={`lang-option ${isFrench ? 'active' : ''}`}>FR</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
