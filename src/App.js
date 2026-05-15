import profilePhoto from "./image/ID.jpeg";
import project1 from "./image/Roshambojpg.jpg";
import project2 from "./image/Damian Glitch Store.jpeg";
import { useState, useEffect, useRef } from "react";
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

// ── Modal for repo details ───────────────────────────────────────────
function RepoModal({ repo, onClose }) {
  if (!repo) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">{repo.name}</h2>
        <p className="modal-desc">{repo.description || "No description provided."}</p>
        <div className="modal-stats">
          <span>⭐ {repo.stargazers_count} stars</span>
          <span>🍴 {repo.forks_count} forks</span>
          <span>👁 {repo.watchers_count} watchers</span>
          <span>🐛 {repo.open_issues_count} issues</span>
        </div>
        {repo.language && (
          <p className="modal-lang">Language: <strong>{repo.language}</strong></p>
        )}
        {repo.topics && repo.topics.length > 0 && (
          <div className="modal-topics">
            {repo.topics.map((t) => <SkillBadge key={t} label={t} />)}
          </div>
        )}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="hero-cta"
          style={{ marginTop: "1rem", display: "inline-block" }}
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

// ── GitHub Repo Card ─────────────────────────────────────────────────
function RepoCard({ repo, onSelect }) {
  return (
    <div className="project-card repo-card" onClick={() => onSelect(repo)}>
      <h3 className="project-title">{repo.name}</h3>
      <p className="project-desc">{repo.description || "No description provided."}</p>
      <div className="repo-meta">
        {repo.language && <SkillBadge label={repo.language} />}
        <span className="repo-stat">⭐ {repo.stargazers_count}</span>
      </div>
      <span className="project-link">View Details →</span>
    </div>
  );
}

// ── Section Components ───────────────────────────────────────────────

// INTERACTIVE ELEMENT 1: Sticky navbar + theme toggle + search bar
function Navbar({ theme, toggleTheme, searchQuery, setSearchQuery }) {
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);

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

        <div className="search-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search skills or projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
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

// GitHub profile info pulled into About Me
function About() {
  const [expanded, setExpanded] = useState(false);
  const [ghProfile, setGhProfile] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/DClarke02")
      .then((res) => res.json())
      .then((data) => setGhProfile(data))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="section">
      <SectionTitle>About Me</SectionTitle>
      <div className="about-grid">
        <div className="about-avatar">
          <img
            src={ghProfile?.avatar_url || profilePhoto}
            alt="Damian Clarke"
          />
          {ghProfile && (
            <div className="gh-stats">
              <span>👥 {ghProfile.followers} followers</span>
              <span>📦 {ghProfile.public_repos} repos</span>
            </div>
          )}
        </div>
        <div className="about-text">
          <p>
            I'm a computer science student at Pace University passionate about building
            clean, user-focused web experiences. I love bridging design and engineering
            to create things that are both functional and beautiful.
          </p>
          {expanded && (
            <p className="extra-text">
              When I'm not coding, you'll find me Playing Video Games, Building Computers, or exploring new
              technologies. I'm currently looking for internship and entry-level opportunities
              in software development.
            </p>
          )}
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less ▲" : "Read More ▼"}
          </button>
        </div>
      </div>
    </section>
  );
}

// INTERACTIVE ELEMENT 2: Skills filtered by search query
function Skills({ searchQuery }) {
  const categories = [
    { label: "Languages", items: ["JavaScript", "Python", "Java", "HTML", "CSS"] },
    { label: "Frameworks & Tools", items: ["React", "Node.js", "Git", "VS Code", "Figma"] },
    { label: "Concepts", items: ["REST APIs", "Responsive Design", "OOP", "Agile"] },
  ];

  const filtered = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <section id="skills" className="section section-alt">
      <SectionTitle>Skills</SectionTitle>
      {filtered.length === 0 ? (
        <p className="no-results">No skills match "{searchQuery}"</p>
      ) : (
        <div className="skills-grid">
          {filtered.map((cat) => (
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
      )}
    </section>
  );
}

//  Load GitHub repos + filter + modal
function Projects({ searchQuery }) {
  const myProjects = [
    {
      title: "Roshambo",
      image: project1,
      description: "One of my favorite projects! I built a rock-paper-scissors game with a twist",
      tech: ["Java"],
      link: "https://github.com/DClarke02/Term-Project.git",
    },
    {
      title: "Damian Glitch Store",
      image: project2,
      description: "I put together a store called Damian Glitch, where I sell computer equipments.",
      tech: ["PHP", "Dockerfile", "Html"],
      link: "https://github.com/PaceCS-344/project1-damian.git",
    },
  ];

  const [repos, setRepos] = useState([]);
  const [repoSearch, setRepoSearch] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch GitHub repos
  useEffect(() => {
    fetch("https://api.github.com/users/DClarke02/repos?sort=updated&per_page=10")
      .then((res) => res.json())
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter my projects by global search
  const filteredProjects = myProjects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter GitHub repos by repo search input
  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
    (r.language && r.language.toLowerCase().includes(repoSearch.toLowerCase()))
  );

  return (
    <section id="projects" className="section">
      <SectionTitle>Projects</SectionTitle>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid" style={{ marginBottom: "60px" }}>
          {filteredProjects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      ) : (
        <p className="no-results" style={{ marginBottom: "60px" }}>
          No projects match "{searchQuery}"
        </p>
      )}

      <h3 className="subsection-title">GitHub Repositories</h3>

      <div className="repo-search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Filter repos by name or language..."
          value={repoSearch}
          onChange={(e) => setRepoSearch(e.target.value)}
        />
        {repoSearch && (
          <button className="search-clear" onClick={() => setRepoSearch("")}>✕</button>
        )}
      </div>

      {loading ? (
        <p className="loading-text">Loading repos...</p>
      ) : filteredRepos.length === 0 ? (
        <p className="no-results">No repos match "{repoSearch}"</p>
      ) : (
        <div className="projects-grid">
          {filteredRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} onSelect={setSelectedRepo} />
          ))}
        </div>
      )}

      <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
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
        <ContactLink href="mailto:clarkedamian0619@gmail.com" icon="✉️" label="clarkedamian0619@gmail.com" />
        <ContactLink href="https://www.linkedin.com/in/damian-clarke-1879a418b" icon="💼" label="linkedin.com/in/damian-clarke-1879a418b" />
        <ContactLink href="https://github.com/DClarke02" icon="🐙" label="github.com/DClarke02" />
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
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className={`app ${theme}`}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Hero />
      <About />
      <Skills searchQuery={searchQuery} />
      <Projects searchQuery={searchQuery} />
      <Contact />
      <Footer />
    </div>
  );
}