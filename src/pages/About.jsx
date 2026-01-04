import { motion } from "framer-motion";
import Magnetic from "../components/Magnetic";
import "./About.css";

const About = () => {
  const skills = [
    { name: "React", category: "Frontend" },
    { name: "GSAP", category: "Animation" },
    { name: "Framer Motion", category: "Animation" },
    { name: "Three.js", category: "3D" },
    { name: "Node.js", category: "Backend" },
    { name: "TypeScript", category: "Language" },
    { name: "Figma", category: "Design" },
    { name: "UI/UX", category: "Design" },
    { name: "WebGL", category: "3D" },
    { name: "Next.js", category: "Frontend" },
    { name: "Tailwind", category: "Styling" },
    { name: "Blender", category: "3D" },
  ];

  const services = [
    {
      title: "Art Direction",
      description:
        "Crafting visual narratives that resonate with your brand identity",
      icon: "🎨",
    },
    {
      title: "Web Development",
      description:
        "Building responsive, performant web applications with modern tech",
      icon: "💻",
    },
    {
      title: "Brand Identity",
      description:
        "Creating cohesive brand systems that stand out in the market",
      icon: "✨",
    },
    {
      title: "Interaction Design",
      description:
        "Designing intuitive interfaces with delightful user experiences",
      icon: "🎯",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="page-about container">
      <motion.div
        className="about-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h1 className="section-title" variants={itemVariants}>
          About Me
        </motion.h1>
        <motion.div className="about-bio" variants={itemVariants}>
          <p>
            I am a multidisciplinary designer and developer crafted in the
            digital space. My work bridges the gap between functional
            engineering and immersive design.
          </p>
          <p>
            I believe in the power of minimalism—stripping away the unnecessary
            to reveal the essential. Every interaction, animation, and pixel
            serves a purpose.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="services-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="section-subtitle" variants={itemVariants}>
          Services
        </motion.h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              data-cursor="hover"
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="skills-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 className="section-subtitle" variants={itemVariants}>
          Capabilities
        </motion.h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <Magnetic key={index}>
              <motion.div
                className="skill-card"
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                data-cursor="hover"
              >
                <span className="skill-name">{skill.name}</span>
                <span className="skill-category">{skill.category}</span>
              </motion.div>
            </Magnetic>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
