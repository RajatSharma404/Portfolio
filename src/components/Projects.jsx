import './Projects.css';

const projectsData = [
    {
        id: '01',
        title: "Neon Horizon",
        category: "Web Application",
        year: "2025",
        link: "#"
    },
    {
        id: '02',
        title: "Aether Lens",
        category: "Photography Portfolio",
        year: "2024",
        link: "#"
    },
    {
        id: '03',
        title: "Echo System",
        category: "Design System",
        year: "2024",
        link: "#"
    },
    {
        id: '04',
        title: "Vortex UI",
        category: "Component Library",
        year: "2023",
        link: "#"
    }
];

const Projects = () => {
    return (
        <section className="projects-section" id="work">
            <div className="projects-header">
                <h2 className="section-title">Work <span className="project-count">{projectsData.length}</span></h2>
            </div>

            <div className="projects-list">
                {projectsData.map((project) => (
                    <a key={project.id} href={project.link} className="project-item">
                        <div className="project-info-left">
                            <span className="project-arrow">→</span>
                            <h3 className="project-item-title">{project.title}</h3>
                        </div>
                        <div className="project-info-right">
                            <span className="project-category">{project.category}</span>
                            <span className="project-year">{project.year}</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Projects;
