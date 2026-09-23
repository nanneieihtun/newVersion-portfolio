import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Mail,
  Menu,
  Moon,
  Server,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

type Theme = "dark" | "light";

type Project = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  technologies: string[];
  icon: ReactNode;
  featured?: boolean;
  details: string[];
};

const projects: Project[] = [
  {
    number: "01",
    title: "AI Travel Planner",
    subtitle: "Plan less. Travel better.",
    description:
      "A full-stack travel planning application designed to turn destinations, attractions and routes into a structured itinerary.",
    category: "PERSONAL PROJECT",
    technologies: [
      "React",
      "TypeScript",
      ".NET",
      "PostgreSQL",
      "EF Core",
      "AI",
    ],
    icon: <Sparkles size={24} />,
    featured: true,
    details: [
      "React + TypeScript frontend",
      ".NET REST API backend",
      "Entity Framework Core",
      "PostgreSQL data layer",
      "Destination and attraction management",
      "Multi-day itinerary generation",
    ],
  },

  {
    number: "02",
    title: "SA201 Reporter",
    subtitle: "Software for real-world laboratory workflows.",
    description:
      "A professional laboratory software platform supporting assay runs, sample workflows, result interpretation and reporting.",
    category: "PROFESSIONAL",
    technologies: [".NET", "C#", "REST API", "WPF", "SQL", "RDLC"],
    icon: <Code2 size={24} />,
    details: [
      "Assay run management",
      "Sample import and export workflows",
      "Result interpretation",
      "Ct threshold processing",
      "Positive / negative determination",
      "Plate setup workflows",
      "RDLC reporting",
      "ID-List XML generation",
    ],
  },

  {
    number: "03",
    title: "qPCR Machine Learning",
    subtitle: "Turning laboratory data into intelligence.",
    description:
      "A Python-based machine learning project exploring predictive analysis using qPCR laboratory data.",
    category: "AI / MACHINE LEARNING",
    technologies: ["Python", "Machine Learning", "Data Processing"],
    icon: <Database size={24} />,
    details: [
      "Python data processing",
      "Machine learning model training",
      "Model serialization",
      "Prediction workflow",
      "Laboratory data processing",
    ],
  },

  {
    number: "04",
    title: "Vela Analytics",
    subtitle: "From application to production.",
    description:
      "Deployment and maintenance of analytics software running on Linux-based environments.",
    category: "PROFESSIONAL",
    technologies: ["Linux", ".NET", "Deployment", "AWS"],
    icon: <Server size={24} />,
    details: [
      "Linux server deployment",
      "Runtime configuration",
      "Service configuration",
      "Application dependency management",
      "Production maintenance",
    ],
  },

  {
    number: "05",
    title: "One QPCR",
    subtitle: "Better workflows through automation.",
    description:
      "Laboratory software focused on user experience and automated data export workflows.",
    category: "PROFESSIONAL",
    technologies: [".NET", "UI/UX", "Automation", "Data Export"],
    icon: <Code2 size={24} />,
    details: [
      "User interface development",
      "Workflow improvements",
      "Automated export",
      "Laboratory data handling",
    ],
  },

  {
    number: "06",
    title: "Workflow Automation",
    subtitle: "Small automation. Big operational impact.",
    description:
      "Automation utilities connecting software workflows with laboratory instruments and operational processes.",
    category: "AUTOMATION",
    technologies: ["C#", "AutoIt", "XML", "CSV"],
    icon: <Sparkles size={24} />,
    details: [
      "Instrument workflow automation",
      "CSV to XML conversion",
      "Barcode validation",
      "QR validation",
      "Automated assay file handling",
    ],
  },
];

const skills = [
  "C#",
  ".NET",
  ".NET Core",
  "ASP.NET",
  "REST APIs",
  "React",
  "Angular",
  "Vue.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "PostgreSQL",
  "SQL Server",
  "Python",
  "Machine Learning",
  "AWS",
  "Docker",
  "RabbitMQ",
  "WPF",
  "WCF",
  "Git",
];

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("portfolio-theme");

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() =>
        setTheme((current) => (current === "dark" ? "light" : "dark"))
      }
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

/* =========================================================
   PROJECT FLIP CARD
   ========================================================= */
   function ProjectCard({ project }: { project: Project }) {
    const [flipped, setFlipped] = useState(false);
  
    const handleFlip = () => {
      setFlipped(true);
    };
  
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setFlipped(false);
    };
  
    return (
      <motion.article
        className="project-card"
        whileHover={!flipped ? { y: -8 } : undefined}
        onClick={!flipped ? handleFlip : undefined}
        onKeyDown={(event) => {
          if (!flipped && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            handleFlip();
          }
        }}
        role="button"
        tabIndex={flipped ? -1 : 0}
        aria-label={`View details for ${project.title}`}
      >
        <motion.div
          className="project-card-inner"
          animate={{
            rotateY: flipped ? 180 : 0,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* =================================================
              FRONT
          ================================================= */}
  
          <div className="project-card-face project-card-front">
            <div className="project-card-top">
              <span className="project-number">
                {project.number}
              </span>
  
              <span className="project-arrow">
                <ArrowUpRight size={22} />
              </span>
            </div>
  
            <div className="project-card-icon">
              {project.icon}
            </div>
  
            <div className="project-card-content">
              <p className="project-category">
                {project.category}
              </p>
  
              <h3>{project.title}</h3>
  
              <p className="project-subtitle">
                {project.subtitle}
              </p>
  
              <p className="project-description">
                {project.description}
              </p>
            </div>
  
            <div className="project-card-footer">
              <div className="project-tech-list">
                {project.technologies
                  .slice(0, 4)
                  .map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
              </div>
  
              <span className="flip-hint">
                CLICK TO EXPLORE
              </span>
            </div>
          </div>
  
          {/* =================================================
              BACK
          ================================================= */}
  
          <div className="project-card-face project-card-back">
            {/* CLOSE BUTTON */}
  
            <button
              type="button"
              className="project-card-close"
              onClick={handleClose}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>
  
            <div className="project-card-top">
              <span className="project-number">
                {project.number}
              </span>
  
              <span className="project-back-label">
                PROJECT DETAILS
              </span>
            </div>
  
            <div className="project-card-back-content">
              <p className="project-category">
                {project.category}
              </p>
  
              <h3>{project.title}</h3>
  
              <p className="project-subtitle">
                {project.subtitle}
              </p>
  
              <div className="project-back-divider" />
  
              <p className="project-back-label">
                WHAT I BUILT
              </p>
  
              <ul className="project-details">
                {project.details.map((detail) => (
                  <li key={detail}>
                    <span>+</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="project-back-tech">
              {project.technologies.map((technology) => (
                <span key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.article>
    );
  }

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="site">
      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="navbar">
        <a href="#top" className="brand" onClick={closeMenu}>
          NAN
        </a>

        <div className="desktop-nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
        </div>

        <div className="nav-actions">
          <ThemeToggle />

          <a href="#contact" className="nav-contact">
            Let&apos;s talk
          </a>

          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <a href="#about" onClick={closeMenu}>
              About
            </a>

            <a href="#work" onClick={closeMenu}>
              Work
            </a>

            <a href="#experience" onClick={closeMenu}>
              Experience
            </a>

            <a href="#skills" onClick={closeMenu}>
              Skills
            </a>

            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="hero section-dark">
          <div className="hero-grid" />

          <div className="hero-content">
            <motion.div
              className="availability"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span />
              Available for new opportunities
            </motion.div>

            <motion.p
              className="hero-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              NAN EI EI HTUN
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              I build software
              <br />
              <span>that feels simple.</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Senior Software Engineer with 9+ years of experience building
              full-stack applications across healthcare, banking, automation,
              data and AI.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a href="#work" className="button button-primary">
                Explore my work
                <ArrowDown size={17} />
              </a>

              <a href="#contact" className="button button-secondary">
                Get in touch
              </a>
            </motion.div>
          </div>

          <div className="hero-bottom">
            <span>FULL-STACK ENGINEERING</span>
            <span>AI &amp; AUTOMATION</span>
            <span>PRODUCT DEVELOPMENT</span>
          </div>
        </section>

        {/* ===================================================
            ABOUT
        =================================================== */}

        <section id="about" className="about section-light">
          <div className="section-container">
            <div className="section-label">01 — ABOUT</div>

            <div className="about-layout">
              <h2>
                Complex systems.
                <br />
                <span>Simple experiences.</span>
              </h2>

              <div className="about-copy">
                <p>
                  I&apos;m a Senior Software Engineer focused on building
                  reliable, maintainable software from backend services to
                  polished user interfaces.
                </p>

                <p>
                  My experience spans healthcare technology, banking systems,
                  laboratory automation, analytics and modern AI-powered
                  applications.
                </p>

                <p>
                  I enjoy taking complicated technical problems and turning
                  them into products that people can actually understand and
                  use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            WORK
        =================================================== */}

        <section id="work" className="work section-dark">
          <div className="section-container">
            <div className="section-heading-light">
              <div className="section-label">02 — SELECTED WORK</div>

              <h2>
                Things I&apos;ve
                <br />
                <span>built.</span>
              </h2>

              <p>
                A selection of personal projects, professional systems and
                engineering experiments.
              </p>
            </div>

            {/* IMPORTANT: only ONE project grid */}
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            EXPERIENCE
        =================================================== */}

        <section
          id="experience"
          className="experience section-light"
        >
          <div className="section-container">
            <div className="section-label">03 — EXPERIENCE</div>

            <div className="experience-heading">
              <h2>
                9+ years of
                <br />
                <span>building software.</span>
              </h2>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">2023 — PRESENT</div>

                <div>
                  <h3>Senior Software Engineer</h3>

                  <p className="timeline-company">
                    Vela Diagnostics PTE. LTD.
                  </p>

                  <p>
                    Building laboratory software, automation workflows,
                    analytics applications and supporting production
                    environments.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">2022 — 2023</div>

                <div>
                  <h3>Senior Software Developer</h3>

                  <p className="timeline-company">CB Bank Myanmar</p>

                  <p>
                    Developed banking applications, APIs, payroll scheduling,
                    RabbitMQ-based processing and reporting systems.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">2016 — 2022</div>

                <div>
                  <h3>Software Developer</h3>

                  <p className="timeline-company">KoeKoeTech</p>

                  <p>
                    Developed and maintained business applications across
                    multiple products and technical environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            SKILLS
        =================================================== */}

        <section id="skills" className="skills section-dark">
          <div className="section-container">
            <div className="section-label">04 — TECHNOLOGY</div>

            <div className="skills-heading">
              <h2>
                The tools
                <br />
                <span>behind the work.</span>
              </h2>
            </div>

            <div className="skills-cloud">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            APPROACH
        =================================================== */}

        <section className="approach section-light">
          <div className="section-container">
            <div className="section-label">
              05 — ENGINEERING APPROACH
            </div>

            <div className="approach-grid">
              <div className="approach-number">01</div>

              <div>
                <h3>Understand the problem first.</h3>

                <p>
                  Good software starts with understanding what people actually
                  need, not immediately choosing a framework.
                </p>
              </div>

              <div className="approach-number">02</div>

              <div>
                <h3>Build for the real world.</h3>

                <p>
                  I care about reliability, maintainability, deployment,
                  performance and what happens after the code reaches
                  production.
                </p>
              </div>

              <div className="approach-number">03</div>

              <div>
                <h3>Keep complexity invisible.</h3>

                <p>
                  The underlying system can be sophisticated. The experience
                  should still feel simple.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            CONTACT
        =================================================== */}

        <section id="contact" className="contact section-dark">
          <div className="contact-glow" />

          <div className="section-container contact-container">
            <div className="section-label">06 — CONTACT</div>

            <h2>
              Let&apos;s build
              <br />
              <span>something great.</span>
            </h2>

            <p>
              I&apos;m currently open to Senior Software Engineering and
              Full-Stack opportunities.
            </p>

            <a
              href="mailto:your.email@example.com"
              className="contact-button"
            >
              <Mail size={19} />
              Get in touch
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer section-dark">
        <span>© 2026 Nan Ei Ei Htun</span>

        <div>
          <a href="#" aria-label="GitHub">
            GH
          </a>

          <a href="#" aria-label="LinkedIn">
            in
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;