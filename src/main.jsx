import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-layout">
      <header className="topbar">
        <div className="identity">
          <a className="site-title" href="/">Ella Fortenbery</a>
          <div className="header-contact">
            <a href="mailto:emf55@duke.edu">emf55@duke.edu</a>
            <a href="tel:+1(980)279-0707">+1 (980) 279-0707</a>
            <a className="linkedin-link" href="https://www.linkedin.com/in/ellafortenbery" target="_blank" rel="noopener noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span> LinkedIn</a>
          </div>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#About Me">About Me</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#research">Research</a>
        </nav>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>
          Menu
        </button>
      </header>

      <aside className={`sidebar${menuOpen ? ' is-open' : ''}`} id="mobile-menu">
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a href="#About Me" onClick={closeMenu}>About Me</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#research" onClick={closeMenu}>Research</a>
        </nav>
        <p className="sidebar-label">Contact Me</p>
        <div className="contact-details">
          <p><a href="mailto:emf55@duke.edu">emf55@duke.edu</a></p>
          <p><a href="tel:+1(980)279-0707">+1 (980) 279-0707</a></p>
          <p><a className="linkedin-link" href="https://www.linkedin.com/in/ellafortenbery" target="_blank" rel="noopener noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span> LinkedIn</a></p>
          <p>Home: Charlotte, NC</p>
        </div>
      </aside>

      <main className="content">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Portfolio</p>
          <h1 id="page-title">Ella Fortenbery</h1>
          <p>Add a short introduction here.</p>
        </section>

        <section className="section" id="About Me">
          <p className="eyebrow">01</p>
          <h2>About Me</h2>
          <p className="placeholder-text">Add your bio here.</p>
        </section>

        <section className="section" id="projects">
          <p className="eyebrow">02</p>
          <h2>Projects</h2>
          <div className="placeholder">Add projects here.</div>
        </section>

        <section className="section" id="skills">
          <p className="eyebrow">03</p>
          <h2>Skills</h2>
          <p className="placeholder-text">Add your skills here.</p>
        </section>

        <section className="section" id="research">
          <p className="eyebrow">04</p>
          <h2>Research</h2>
          <div className="placeholder">Add publications here.</div>
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
