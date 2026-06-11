import React, { useState, useEffect } from 'react';
import './App.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram,
  FaCode,
  FaEnvelope,
  FaPaperPlane,
  FaArrowDown,
  FaStar,
  FaEye
} from 'react-icons/fa';

function App() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  // Projects Data - Easy to update weekly!
  const projectsData = [
    {
      id: 1,
      title: "AI Image Generator",
      description: "Transform text descriptions into stunning images using DALL-E API. Features real-time generation and style customization.",
      image: "https://images.unsplash.com/photo-1545235617-7a424c1a60cb?w=600",
      tags: ["React", "OpenAI", "Tailwind"],
      category: "web",
      github: "https://github.com",
      live: "https://demo.com",
      featured: true,
      date: "2026-06-01"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with cart, payments, user auth, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
      tags: ["React", "Node.js", "MongoDB"],
      category: "web",
      github: "https://github.com",
      live: "https://demo.com",
      featured: false,
      date: "2026-05-15"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather app with interactive maps, 7-day forecast, and weather alerts.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600",
      tags: ["React", "API", "Charts"],
      category: "web",
      github: "https://github.com",
      live: "https://demo.com",
      featured: false,
      date: "2026-05-01"
    },
    {
      id: 4,
      title: "Task Manager Pro",
      description: "Productivity app with drag-and-drop, due dates, team collaboration, and analytics.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600",
      tags: ["React", "Firebase", "DnD"],
      category: "web",
      github: "https://github.com",
      live: "https://demo.com",
      featured: true,
      date: "2026-04-20"
    }
  ];

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="app">
      {/* Custom Cursor */}
      <div className="cursor"></div>
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            AT<span className="logo-dot">.</span>
          </motion.div>
          
          <motion.div 
            className="nav-links"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <span className="greeting">✨ Hello, I'm</span>
            <h1 className="glitch" data-text="Aurorathunder7">
              Aurorathunder7
            </h1>
            <div className="typed-wrapper">
              <TypeWriter />
            </div>
            <p className="hero-description">
              I craft exceptional digital experiences with modern web technologies
            </p>
            <div className="hero-buttons">
              <motion.a 
                href="#projects" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work <FaArrowDown />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me <FaEnvelope />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="stats-card">
              <FaCode className="stats-icon" />
              <div className="stats-grid">
                <div className="stat">
                  <AnimatedNumber target={20} />
                  <span>Projects</span>
                </div>
                <div className="stat">
                  <AnimatedNumber target={4} />
                  <span>Years</span>
                </div>
                <div className="stat">
                  <AnimatedNumber target={15} />
                  <span>Clients</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="mouse"></div>
          <p>Scroll to explore</p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">PORTFOLIO</span>
            <h2>Featured Work</h2>
            <p>Here are some of my favorite projects</p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            className="filter-buttons"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {['all', 'web', 'design', 'api'].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'All Projects' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">ABOUT ME</span>
            <h2>Who Am I?</h2>
          </motion.div>

          <div className="about-content">
            <motion.div 
              className="about-text"
              ref={aboutRef}
              initial="hidden"
              animate={aboutInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h3>I'm a passionate developer who loves creating amazing web experiences</h3>
              <p>I specialize in building modern, responsive, and user-friendly websites and applications. With a keen eye for design and a focus on performance, I bring ideas to life through clean code and creative solutions.</p>
              
              <div className="skills">
                <div className="skill-category">
                  <h4>Frontend Development</h4>
                  <div className="skill-items">
                    {['React', 'Vue', 'Next.js', 'Tailwind'].map(skill => (
                      <SkillBar key={skill} name={skill} level={85 + Math.random() * 10} />
                    ))}
                  </div>
                </div>
                <div className="skill-category">
                  <h4>Backend Development</h4>
                  <div className="skill-items">
                    {['Node.js', 'Python', 'GraphQL', 'MongoDB'].map(skill => (
                      <SkillBar key={skill} name={skill} level={75 + Math.random() * 15} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="code-card">
                <div className="code-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <pre className="code-content">
                  <code>
                    <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}<br/>
                    &nbsp;&nbsp;<span className="property">name</span>: <span className="string">"Aurorathunder7"</span>,<br/>
                    &nbsp;&nbsp;<span className="property">role</span>: <span className="string">"Full Stack Developer"</span>,<br/>
                    &nbsp;&nbsp;<span className="property">passion</span>: <span className="string">"Building cool stuff"</span>,<br/>
                    &nbsp;&nbsp;<span className="property">code</span>: <span className="keyword">function</span>() {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="keyword">return</span> <span className="string">"Innovation through code"</span>;<br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    {'}'};
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">GET IN TOUCH</span>
            <h2>Let's Work Together</h2>
            <p>Have a project in mind? I'd love to hear about it</p>
          </motion.div>

          <div className="contact-container">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { icon: FaEnvelope, title: "Email", value: "aurorathunder7@example.com" },
                { icon: FaGithub, title: "GitHub", value: "github.com/Aurorathunder7" },
                { icon: FaTwitter, title: "Twitter", value: "@aurorathunder7" }
              ].map((item, idx) => (
                <div key={idx} className="contact-card">
                  <item.icon />
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.form 
              className="contact-form"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! I will get back to you soon.');
                e.target.reset();
              }}
            >
              <div className="form-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Your Name</label>
                <span className="focus-border"></span>
              </div>
              <div className="form-group">
                <input type="email" id="email" required />
                <label htmlFor="email">Your Email</label>
                <span className="focus-border"></span>
              </div>
              <div className="form-group">
                <textarea id="message" rows="5" required></textarea>
                <label htmlFor="message">Your Message</label>
                <span className="focus-border"></span>
              </div>
              <motion.button 
                type="submit" 
                className="btn-submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message <FaPaperPlane />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          {[FaGithub, FaTwitter, FaLinkedin, FaInstagram].map((Icon, idx) => (
            <motion.a 
              key={idx}
              href="#"
              className="social-link"
              whileHover={{ y: -3 }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
        <p>&copy; 2026 Aurorathunder7. All rights reserved.</p>
      </footer>
    </div>
  );
}

// TypeWriter Component
function TypeWriter() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && index < words.length) {
        setText(words[index].substring(0, text.length + 1));
        if (text.length + 1 === words[index].length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else if (isDeleting && text.length > 0) {
        setText(text.substring(0, text.length - 1));
      } else if (isDeleting && text.length === 0) {
        setIsDeleting(false);
        setIndex((index + 1) % words.length);
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [text, index, isDeleting, words]);
  
  return (
    <div className="typed-container">
      <span className="typed-text">{text}</span>
      <span className="cursor-blink">|</span>
    </div>
  );
}

// AnimatedNumber Component
function AnimatedNumber({ target }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, target]);
  
  return <span ref={ref} className="stat-number">{count}</span>;
}

// ProjectCard Component
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        {isHovered && (
          <motion.div 
            className="project-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <a href={project.live} className="overlay-link">
              <FaEye /> Live Demo
            </a>
            <a href={project.github} className="overlay-link">
              <FaGithub /> GitHub
            </a>
          </motion.div>
        )}
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        {project.featured && (
          <div className="featured-badge">
            <FaStar /> Featured
          </div>
        )}
      </div>
    </motion.div>
  );
}

// SkillBar Component
function SkillBar({ name, level }) {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    if (inView) {
      setTimeout(() => setWidth(level), 100);
    }
  }, [inView, level]);
  
  return (
    <div ref={ref} className="skill-item">
      <div className="skill-info">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div 
          className="skill-progress"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default App;