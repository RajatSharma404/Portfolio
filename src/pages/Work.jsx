import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import './Work.css';

const projects = [
    {
        id: 'ai-assistant',
        title: 'AI Assistant',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070&auto=format&fit=crop',
        description: 'An intelligent AI assistant application built with Python, featuring natural language processing and voice interaction capabilities.',
        stack: ['Python', 'AI/ML', 'NLP'],
        github: 'https://github.com/RajatSharma404/Ai_Assistant',
        live: null
    },
    {
        id: 'finance-tracker',
        title: 'Finance Tracker',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        description: 'A comprehensive finance tracking application for monitoring expenses, income, and financial goals with intuitive visualizations.',
        stack: ['React', 'Next.js', 'Tailwind'],
        github: 'https://github.com/RajatSharma404/Finance_track',
        live: 'https://finance-track-three.vercel.app'
    },
    {
        id: 'expense-tracker',
        title: 'Expense Tracker',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        description: 'TypeScript-based expense tracking system with real-time updates, categorization, and detailed analytics.',
        stack: ['TypeScript', 'React', 'Node.js'],
        github: 'https://github.com/RajatSharma404/expense-tracker',
        live: null
    },
    {
        id: 'todo-list',
        title: 'Todo List App',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2039&auto=format&fit=crop',
        description: 'Feature-rich todo list application with drag-and-drop functionality, priority management, and deadline tracking.',
        stack: ['JavaScript', 'React', 'CSS3'],
        github: 'https://github.com/RajatSharma404/todo-list',
        live: null
    },
    {
        id: 'weather-forecast',
        title: 'Weather Forecast App',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2065&auto=format&fit=crop',
        description: 'Real-time weather forecast application with location-based predictions, interactive maps, and detailed weather metrics.',
        stack: ['JavaScript', 'Weather API', 'Geolocation'],
        github: 'https://github.com/RajatSharma404/weather-forecast-app',
        live: null
    },
    {
        id: 'iot-mcu-programmer',
        title: 'IoT MCU Programmer',
        category: 'IoT',
        image: 'https://images.unsplash.com/photo-1518770660439-8d3007e8fe74?q=80&w=2070&auto=format&fit=crop',
        description: 'Python-based tool for programming microcontrollers and IoT devices with a user-friendly interface.',
        stack: ['Python', 'IoT', 'Embedded Systems'],
        github: 'https://github.com/RajatSharma404/IoT-MCU-programmer',
        live: null
    }
];

const Work = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Development', 'IoT'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter || (filter === 'Development' && p.category.includes('Development')));

    return (
        <div className="page-work container">
            <div className="work-header">
                <h1 className="section-title">Selected Work</h1>
                <div className="filter-controls">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                            data-cursor="hover"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div layout className="projects-grid">
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Work;
