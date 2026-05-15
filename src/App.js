import profilePhoto from "./image/ID.jpeg";
import project1 from "./image/Roshambojpg.jpg";
import project2 from "./image/Damian Glitch Store.jpeg";
import { useState, useEffect } from "react";
import "./styles.css";

// ── Reusable Components ──────────────────────────────────────────────

function NavLink({ href, children }) {
  return (
    <a href={href} className="nav-link">
      {children}
    </a>
  );
}

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>;
}

function SkillBadge({ label }) {
  return <span className="skill-badge">{label}</span>;
}

function ProjectCard({ title, description, tech, link, image }) {
  return (
    <div className="project-card">
      {image && <img src={image} alt={title} className="project-img" />}
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>
      <div className="project-tech">
        {tech.map((t) => (
          <SkillBadge key={t} label={t} />
        ))}
      </div>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="project-link">
          View Project →
        </a>
      )}
    </div>
  );
}

function ContactLink({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="contact-link">
      <span className="contact-icon">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

// ── Section Components ───────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <span className="nav-logo">Damian Clarke</span>
      <div className="nav-links">
        <NavLink href="#about">About</NavLink>
        <NavLink href="#skills">Skills</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">Damian Clarke</h1>
        <p className="hero-tagline">Full-Stack Developer · Designer · Problem Solver</p>
        <a href="#contact" className="hero-cta">Get in Touch</a>
      </div>
      <div className="hero-blob" aria-hidden="true" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SectionTitle>About Me</SectionTitle>
      <div className="about-grid">
        <div className="about-avatar">
          <img src={profilePhoto} alt="Damian Clarke" />
        </div>
        <div className="about-text">
          <p>
            I'm a computer science student at Pace University passionate about building
            clean, user-focused web experiences. I love bridging design and engineering
            to create things that are both functional and beautiful.
          </p>
          <p>
            When I'm not coding, you'll find me Playing Video Games, Building Computers, or exploring new
            technologies. I'm currently looking for internship and entry-level opportunities
            in software development.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const categories = [
    {
      label: "Languages",
      items: ["JavaScript", "Python", "Java", "HTML", "CSS"],
    },
    {
      label: "Frameworks & Tools",
      items: ["React", "Node.js", "Git", "VS Code", "Figma"],
    },
    {
      label: "Concepts",
      items: ["REST APIs", "Responsive Design", "OOP", "Agile"],
    },
  ];

  return (
    <section id="skills" className="section section-alt">
      <SectionTitle>Skills</SectionTitle>
      <div className="skills-grid">
        {categories.map((cat) => (
          <div key={cat.label} className="skills-category">
            <h3 className="skills-category-title">{cat.label}</h3>
            <div className="skills-badges">
              {cat.items.map((item) => (
                <SkillBadge key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Roshambo",
      image: project1,
      description:
        "One of my favorite projects! I built a rock-paper-scissors game with a twist",
      tech: ["Java"],
      link: "https://github.com/DClarke02/Term-Project.git",
    },
    {
      title: "Damian Glitch Store",
      image: project2,
      description:
        "I put together a store called Damian Glitch, where I sell computer equipments.",
      tech: ["PHP", "Dockerfile", "Html"],
      link: "https://github.com/PaceCS-344/project1-damian.git",
    },
  ];

  return (
    <section id="projects" className="section">
      <SectionTitle>Projects</SectionTitle>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section section-alt">
      <SectionTitle>Contact</SectionTitle>
      <p className="contact-intro">
        I'm always open to new opportunities and advice to improve my skills. Reach out!
      </p>
      <div className="contact-links">
        <ContactLink
          href="mailto:clarkedamian0619@gmail.com"
          icon="✉️"
          label="clarkedamian0619@gmail.com"
        />
        <ContactLink
          href="https://www.linkedin.com/in/damian-clarke-1879a418b"
          icon="💼"
          label="linkedin.com/in/damian-clarke-1879a418b"
        />
        <ContactLink
          href="https://github.com/DClarke02"
          icon="🐙"
          label="github.com/DClarke02"
        />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Damian Clarke · Built with React</p>
    </footer>
  );
}

// ── Root App ─────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

