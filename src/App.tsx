
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
    title: "SA201 Reporter",
    subtitle: "Diagnostic laboratory software for real-world workflows.",
    description:
      "A laboratory software platform supporting assay management, plate setup, result interpretation, visualization and reporting.",
    category: "PROFESSIONAL",
    technologies: [".NET", "C#", "WPF", "REST API", "SQL", "RDLC"],
    icon: <Code2 size={24} />,
    featured: true,
    details: [
      "Assay run management",
      "Plate setup workflows",
      "Result interpretation",
      "Ct threshold processing",
      "Positive / negative determination",
      "RDLC reporting",
      "Data visualization",
      "ID-List XML generation",
      "Integration with QuantStudio 12K Flex",
    ],
  },

  {
    number: "02",
    title: "Sentosa Workflow Assistant",
    subtitle: "Reliable sample identification through automation.",
    description:
      "A laboratory workflow application focused on barcode validation and reliable sample identification.",
    category: "PROFESSIONAL",
    technologies: [".NET", "C#", "Barcode", "Automation"],
    icon: <Sparkles size={24} />,
    details: [
      "Barcode validation",
      "Sample identification",
      "Workflow validation",
      "Laboratory process automation",
    ],
  },

  {
    number: "03",
    title: "SX-Flex-Assistant",
    subtitle: "Software-assisted laboratory workflows.",
    description:
      "A software solution supporting laboratory workflows and integration around diagnostic instrument operations.",
    category: "PROFESSIONAL",
    technologies: [".NET", "C#", "Automation", "Laboratory"],
    icon: <Server size={24} />,
    details: [
      "Laboratory workflow support",
      "Application integration",
      "Instrument workflow assistance",
      "Operational troubleshooting",
    ],
  },

  {
    number: "04",
    title: "ID-List Generator",
    subtitle: "From plate setup to executable assay configuration.",
    description:
      "A utility for generating structured XML configuration files from laboratory plate setup workflows.",
    category: "AUTOMATION",
    technologies: ["C#", "XML", ".NET", "Laboratory"],
    icon: <Database size={24} />,
    details: [
      "Plate setup layouts",
      "XML generation",
      "Assay configuration",
      "Structured data processing",
      "Automated laboratory workflow support",
    ],
  },

  {
    number: "05",
    title: "Vela Analytics",
    subtitle: "From application to production.",
    description:
      "Analytics software deployed and maintained in Linux-based production environments.",
    category: "PROFESSIONAL",
    technologies: [".NET", "Linux", "AWS", "Deployment"],
    icon: <Server size={24} />,
    details: [
      "Linux server deployment",
      "Runtime configuration",
      "Service configuration",
      "Dependency management",
      "Production troubleshooting",
      "Application maintenance",
    ],
  },

  {
    number: "06",
    title: "CB Bank iBanking",
    subtitle: "Digital banking for personal and corporate users.",
    description:
      "Contributed to banking platforms supporting personal and corporate customers, payments, transfers and financial reporting.",
    category: "BANKING",
    technologies: [
      "C#",
      ".NET",
      "WCF",
      "Web API",
      "SQL Server",
      "RabbitMQ",
    ],
    icon: <Code2 size={24} />,
    details: [
      "Personal iBanking platform",
      "Corporate iBanking platform",
      "Payment and transfer modules",
      "Customer service portal",
      "Payroll scheduler integration",
      "RabbitMQ message handling",
      "WCF services and APIs",
      "RDLC financial reports",
      "Electronic statements",
    ],
  },

  {
    number: "07",
    title: "MayMay / MayMay Plus",
    subtitle: "Web, APIs, CMS and conversational experiences.",
    description:
      "A digital platform combining web applications, REST APIs, CMS functionality and chatbot integration.",
    category: "WEB PLATFORM",
    technologies: ["Web", "REST API", "CMS", "Chatbot"],
    icon: <Code2 size={24} />,
    details: [
      "Web application development",
      "REST API development",
      "CMS development",
      "Android chatbot integration",
      "Backend integration",
      "Content management workflows",
    ],
  },

  {
    number: "08",
    title: "Central Statistical Organization",
    subtitle: "Digital platform for national statistics.",
    description:
      "A website and CMS developed to support the national statistical system and public access to statistical information.",
    category: "PUBLIC SECTOR",
    technologies: ["Web", "CMS", "REST API"],
    icon: <Database size={24} />,
    details: [
      "Website development",
      "CMS development",
      "Statistical content management",
      "Public-facing information architecture",
      "Backend integration",
    ],
  },

  {
    number: "09",
    title: "AI Travel Planner",
    subtitle: "A modern full-stack project.",
    description:
      "A personal travel planning application built to explore modern full-stack architecture, itinerary planning and AI-assisted features.",
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
      "Multi-day itinerary planning",
    ],
  },

  {
    number: "10",
    title: "qPCR Machine Learning",
    subtitle: "Exploring machine learning with laboratory data.",
    description:
      "A Python-based machine learning project exploring data preparation, model training and prediction using qPCR laboratory data.",
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
  "AutoIt",
  "LINQ",
  "HTML5",
  "CSS3",
  "Bootstrap",
  "jQuery",
  "Git",
  "TeamCity",
  "Octopus Deploy",
];

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("portfolio-theme");

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
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
        setTheme((current) =>
          current === "dark" ? "light" : "dark"
        )
      }
      aria-label={`Switch to ${
        theme === "dark" ? "light" : "dark"
      } mode`}
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

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setFlipped(false);
  };

  return (
    <motion.article
      className="project-card"
      whileHover={!flipped ? { y: -8 } : undefined}
      onClick={!flipped ? handleFlip : undefined}
      onKeyDown={(event) => {
        if (
          !flipped &&
          (event.key === "Enter" || event.key === " ")
        ) {
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

            <span className="project-arrow" aria-hidden="true">
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
        <a
          href="#top"
          className="brand"
          onClick={closeMenu}
        >
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

          <a
            href="#contact"
            className="nav-contact"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            className="menu-button"
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            aria-label={
              menuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
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
            initial={{
              opacity: 0,
              y: -12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
          >
            <a href="#about" onClick={closeMenu}>
              About
            </a>

            <a href="#work" onClick={closeMenu}>
              Work
            </a>

            <a
              href="#experience"
              onClick={closeMenu}
            >
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
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
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
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.7,
              }}
            >
              I build software
              <br />
              <span>that feels simple.</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.25 }}
            >
              Senior Software Engineer with 9+ years
              of experience building full-stack
              applications across healthcare,
              diagnostics, automation and banking.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.35 }}
            >
              <a
                href="#work"
                className="button button-primary"
              >
                Explore my work
                <ArrowDown size={17} />
              </a>

              <a
                href="/Nan_Ei_Ei_Htun(Senior Software Engineer).pdf"
                download
                className="button button-secondary"
              >
                Download CV
                <ArrowUpRight size={17} />
              </a>
            </motion.div>
          </div>

          <div className="hero-bottom">
            <span>FULL-STACK ENGINEERING</span>
            <span>LABORATORY &amp; AUTOMATION</span>
            <span>PRODUCT DEVELOPMENT</span>
          </div>
        </section>

        {/* ===================================================
            ABOUT
        =================================================== */}

        <section
          id="about"
          className="about section-light"
        >
          <div className="section-container">
            <div className="section-label">
              01 — ABOUT
            </div>

            <div className="about-layout">
              <h2>
                Complex systems.
                <br />
                <span>Simple experiences.</span>
              </h2>

              <div className="about-copy">
                <p>
                  I&apos;m a Senior Software Engineer
                  with 9+ years of experience building
                  full-stack applications across
                  healthcare, diagnostics, automation,
                  and banking.
                </p>

                <p>
                  My experience spans backend services,
                  web applications, laboratory software,
                  banking systems, automation workflows,
                  analytics, and data-driven
                  applications.
                </p>

                <p>
                  I enjoy taking complicated technical
                  problems and turning them into reliable,
                  maintainable software that people can
                  actually understand and use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            WORK
        =================================================== */}

        <section
          id="work"
          className="work section-dark"
        >
          <div className="section-container">
            <div className="section-heading-light">
              <div className="section-label">
                02 — SELECTED WORK
              </div>

              <h2>
                Things I&apos;ve
                <br />
                <span>built.</span>
              </h2>

              <p>
                A selection of personal projects,
                professional systems and engineering
                work across healthcare, banking,
                automation and web platforms.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                />
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
            <div className="section-label">
              03 — EXPERIENCE
            </div>

            <div className="experience-heading">
              <h2>
                9+ years of
                <br />
                <span>building software.</span>
              </h2>
            </div>

            <div className="timeline">

              <div className="timeline-item">
                <div className="timeline-year">
                  2023 — PRESENT
                </div>

                <div>
                  <h3>
                    Senior Software Engineer
                  </h3>

                  <p className="timeline-company">
                    Vela Diagnostics PTE. LTD. · Singapore
                  </p>

                  <p>
                    Develop and maintain diagnostic
                    laboratory software using C#, .NET
                    and web technologies, supporting
                    assay workflows, data processing,
                    automation and production
                    environments.
                  </p>

                  <p>
                    Worked across laboratory applications
                    including SA201 Reporter, Vela
                    Analytics, One QPCR, Sentosa Workflow
                    Assistant, SX-Flex-Assistant and
                    ID-List Generator, with additional
                    experience in instrument automation,
                    XML/CSV processing and qPCR data
                    analysis.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">
                  2022 — 2023
                </div>

                <div>
                  <h3>
                    Senior Software Developer
                  </h3>

                  <p className="timeline-company">
                    CB Bank · Myanmar
                  </p>

                  <p>
                    Developed personal and corporate
                    iBanking applications, payment and
                    transfer modules, customer service
                    systems and financial reporting
                    solutions.
                  </p>

                  <p>
                    Worked with .NET, WCF, Web APIs,
                    SQL Server, RabbitMQ and scheduled
                    processing, collaborating with QA
                    teams throughout development and
                    testing.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-year">
                  2016 — 2022
                </div>

                <div>
                  <h3>
                    Software Developer
                  </h3>

                  <p className="timeline-company">
                    KoeKoeTech IT Social Enterprise
                    Co., Ltd. · Myanmar
                  </p>

                  <p>
                    Built and maintained web applications,
                    REST APIs and CMS platforms across
                    healthcare, public-sector and
                    social-impact projects.
                  </p>

                  <p>
                    Worked on platforms including MayMay /
                    MayMay Plus, the Central Statistical
                    Organization website, Christian Aid
                    child health projects and other
                    business and healthcare websites.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            SKILLS
        =================================================== */}

        <section
          id="skills"
          className="skills section-dark"
        >
          <div className="section-container">
            <div className="section-label">
              04 — TECHNOLOGY
            </div>

            <div className="skills-heading">
              <h2>
                The tools
                <br />
                <span>behind the work.</span>
              </h2>
            </div>

            <div className="skills-cloud">
              {skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
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

              <div className="approach-number">
                01
              </div>

              <div>
                <h3>
                  Understand the problem first.
                </h3>

                <p>
                  Good software starts with understanding
                  what people actually need, not immediately
                  choosing a framework.
                </p>
              </div>

              <div className="approach-number">
                02
              </div>

              <div>
                <h3>
                  Build for the real world.
                </h3>

                <p>
                  I care about reliability, maintainability,
                  deployment, performance and what happens
                  after the code reaches production.
                </p>
              </div>

              <div className="approach-number">
                03
              </div>

              <div>
                <h3>
                  Keep complexity invisible.
                </h3>

                <p>
                  The underlying system can be sophisticated.
                  The experience should still feel simple.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            CONTACT
        =================================================== */}

        <section
          id="contact"
          className="contact section-dark"
        >
          <div className="contact-glow" />

          <div className="section-container contact-container">
            <div className="section-label">
              06 — CONTACT
            </div>

            <h2>
              Let&apos;s build
              <br />
              <span>something great.</span>
            </h2>

            <p>
              I&apos;m currently open to Senior Software
              Engineering and Full-Stack opportunities.
            </p>

            <div className="contact-actions">
              <a
                href="mailto:nanneieihtun@gmail.com"
                className="contact-button"
              >
                <Mail size={19} />
                Get in touch
                <ArrowUpRight size={18} />
              </a>

              <a
                href="/Nan_Ei_Ei_Htun(Senior Software Engineer).pdf"
                download
                className="contact-button contact-button-secondary"
              >
                <ArrowDown size={18} />
                Download CV
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer section-dark">
        <span>
          © 2026 Nan Ei Ei Htun
        </span>

        <div>
          <a
            href="https://github.com/nanneieihtun"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            GH
          </a>

          <a
            href="https://www.linkedin.com/in/naneieihtun"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            in
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
