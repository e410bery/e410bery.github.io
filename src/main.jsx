import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <main className="page-shell">
      <nav className="nav" aria-label="Main navigation">
        <a href="/">Placeholder</a>
        <div className="nav-links">
          <a href="#section-one">Link</a>
          <a href="#section-two">Link</a>
          <a href="#contact">Link</a>
        </div>
      </nav>
      <section className="hero" id="section-one">
        <p className="eyebrow">Placeholder</p>
        <h1>Heading placeholder</h1>
        <p className="intro">Basic placeholder text for this section.</p>
      </section>
      <section className="section" id="section-two">
        <p className="eyebrow">Placeholder</p>
        <h2>Heading placeholder</h2>
        <p>Basic placeholder text for this section.</p>
        <div className="placeholder">Placeholder</div>
      </section>
      <footer id="contact">
        <p>Placeholder</p>
        <a href="#">Link</a>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
