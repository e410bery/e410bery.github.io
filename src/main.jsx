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
        </section>

        <section className="section" id="About Me">
          <p className="eyebrow">01</p>
          <h2>About Me</h2>
          <p className="placeholder-text">I am graduating from Duke University this May with a degree in Biomedical Engineering and Computer Science. I’m passionate about building technology at the intersection of software and healthcare. My long-term goal is to create immersive, interactive experiences that help people better understand health and medicine.</p>
          <p className="placeholder-text">In my free time I enjoy playing video games, sewing, and cuddling with my dogs.</p>

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
          <h3>Outstanding Paper Award: Performance and portability of a production fluid–structure interaction solver across NVIDIA GPU generations</h3>
            <p><b>Skills: GPU computing · CUDA ecosystem · HPC · Slurm · MPI · NVIDIA Nsight Compute · Kernel profiling · Performance analysis · Data visualization · Technical writing</b></p>
            <p style={{ textIndent: '2em' }}>Evaluated the performance portability of a massively parallel production fluid–structure interaction solver across three NVIDIA GPU generations and five GPU programming models. Built and maintained a consistent compilation and benchmarking workflow, carefully controlling compiler flags and code optimizations so that comparisons were meaningful and reproducible.</p>
            <p style={{ textIndent: '2em' }}>Profiled GPU kernels with NVIDIA Nsight Compute and runtime profiling tools to identify performance behavior across architectures. Scheduled and managed distributed GPU workloads with Slurm and MPI ranks; parsed benchmark output, produced performance visualizations, maintained technical documentation, and communicated findings through a published paper and conference presentation.</p>
            <p><small>E. Fortenbery, J. Stoop, A. Yousef, &amp; A. Randles, "Performance and portability of a production fluid–structure interaction solver across NVIDIA GPU generations" [Conference presentation]. <i>2026 IEEE High Performance Extreme Computing Conference (HPEC)</i>, Wakefield, MA, USA. 2026, September 15.</small></p>

          <h3>XR Interaction for Cardiovascular Surgical Planning</h3>
            <p><b>Skills: Unity · XR/Spatial Computing · Cross-platform development · 3D interaction design · User research · Usability testing · Survey design · Experimental design · Data analysis</b></p>
            <p style={{ textIndent: '2em' }}>            Designed and developed an XR user-study application to compare the usability of Apple Vision Pro and Sony’s ELF-SRD 3D display for cardiovascular surgical planning. The application measures how accurately and quickly users identify specified anatomical regions within interactive 3D cardiovascular models.</p>
            <p style={{ textIndent: '2em' }}>            Polished and adapted the Apple Vision Pro experience, and independently built the Sony ELF-SRD version in Unity. Designed the comparative user study and participant survey to capture both objective task performance—accuracy and completion time—and subjective feedback on comfort, usability, and overall experience.</p>
            <p><small>~Research in progress~</small></p>

        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
)
