import { useEffect, useRef, useState } from 'react'

// image accepts one path or an array of paths; paper accepts a PDF path.
// Files in project_supps are included in the production build.
const mediaFiles = import.meta.glob('../project_supps/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
})
const mediaUrl = (path) => mediaFiles[`../${path}`] || path

// Leave these fields empty to hide the image or paper link.
const projects = [
  { //link pdf after approved
    title: 'Kidney Stone Surgery Training Simulator',
    image: ['project_supps/kidney_sim.png', 'project_supps/ultrasound_kidney.png'],
    paper: '',
    paperLabel: '',
    description:
      'Engineered a low-cost surgical training device for practicing ultrasound-guided needle placement in kidney stone procedures. Developed the system over two years as part of a multidisciplinary team working with a physician stakeholder. Designed and conducted a training study to evaluate the simulator, using statistical analysis to demonstrate significant improvements in procedural performance.',
  },
  {
    title: 'Temperature-Responsive Pacemaker',
    image: 'project_supps/pacemaker.png',
    paper: 'project_supps/PacemakerReport.pdf',
    paperLabel: 'Report (PDF)',
    description:
      'Designed and built a temperature-responsive cardiac pacing system using operational amplifiers, a thermistor, and a microcontroller. Integrated analog circuitry with embedded control to adjust pacing behavior in response to temperature changes, then evaluated the system through in vivo testing on a frog model to characterize its physiological effectiveness.',
  },
  {
    title: 'Wearable System for Acute Anxiety Intervention',
    image: 'project_supps/anxiety_bracelet.png',
    paper: '',
    paperLabel: '',
    description:
      'Developing a modular wearable system intended to help address acute anxiety symptoms through devices positioned over targeted pressure points. The system uses Bluetooth-enabled microcontrollers to coordinate multiple wearable modules, combining embedded hardware, wireless communication, and human-centered medical device design.',
  },
  {
    title: 'Patient Database',
    repository: 'https://github.com/e410bery/patient-database',
    image: '',
    paper: '',
    paperLabel: '',
    description:
      'Developed a server for managing patient lab results and requests. The system includes separate physician and lab technician interfaces connected through a cloud-deployed Python Flask REST API and MongoDB database, enabling communication and centralized management across multiple clients. The server has an automated email sending feature to notify physicians when new lab results are available.',
  },
  {
    title: 'Breast Tumor Detection from Mammograms',
    image: '',
    paper: 'project_supps/mammogram_slides.pdf',
    paperLabel: 'Presentation (PDF)',
    description:
      'Developed, trained, and evaluated three convolutional neural networks for breast tumor detection in mammography images. Compared multiple image preprocessing techniques to study how changes to the input pipeline affected model performance, exploring the role of preprocessing in medical image classification.',
  },
  {
    title: 'Medical Equipment Management Platform',
    image: '',
    paper: '',
    paperLabel: '',
    description:
      'Developing a full-stack database platform for managing medical equipment across organizations, including inventory, purchases, manufacturers, maintenance records, certifications, orders, and fulfillment. The system uses Python and Flask for the backend, PostgreSQL for relational data management, and a web-based frontend, with parameterized SQL queries used to protect database operations from SQL injection.',
  },
  {
    title: 'Embedded Firmware with Zephyr RTOS',
    image: '',
    paper: '',
    paperLabel: '',
    description:
      'Developing embedded firmware in C using Zephyr RTOS for Nordic Semiconductor hardware. Working directly with microcontrollers to configure, flash, and debug firmware while gaining experience with resource-constrained embedded systems and hardware-software integration relevant to connected medical devices.',
  },
  {
    title: 'Cellular Modeling of Drug-Drug Interactions in Depression',
    image: 'project_supps/serotonin_graph.png',
    paper: 'project_supps/serotonin_drug_interaction.pdf',
    paperLabel: 'Read paper',
    description:
      'Collaboratively developed a Python-based computational model of cellular systems associated with depression, MAOI medication, and cough syrup. Used mathematical and computational modeling to represent biological processes and communicate how system-level interactions contribute to changes in serotonin levels due to drug-drug interactions with dextromethorphan.',
  },
  {
    title: 'Object-Oriented Multilayer Perceptrons',
    image: '',
    paper: 'project_supps/Final MLP Report Connectionist Computing.pdf',
    paperLabel: 'Report (PDF)',
    description:
      'Implemented, trained, and evaluated multilayer perceptron neural networks in Java using an object-oriented architecture. Built the components required for model representation and experimentation while comparing model behavior and predictive performance across training configurations.',
  },
  {
    title: 'Custom Graphics Engine',
    imageLayout: 'row',
    image: ['project_supps/graphics/lion_head.png', 'project_supps/graphics/spock_quad.png', 'project_supps/graphics/sweep_mesh.png'],
    paper: '',
    paperLabel: '',
    description:
      'Developed a graphics engine in C and C++ based on a predefined rendering API, implementing core graphics functionality from the ground up. The project provided experience with low-level software development, rendering systems, software architecture, and debugging performance-oriented native code. API included support for shaders, textures, polygons, blending, and image transformations.',
  },
];

export default function Projects() {
  const projectsRef = useRef(null)
  const paperDialogRef = useRef(null)
  const [activePaper, setActivePaper] = useState(null)

  useEffect(() => {
    if (!activePaper) return
    const dialog = paperDialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [activePaper])
  const [projectScroll, setProjectScroll] = useState({ previous: false, next: false })

  useEffect(() => {
    const track = projectsRef.current
    const contents = [...track.querySelectorAll('.project-card-content')]
    let frame
    const updateHeight = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const tallest = Math.max(...contents.map((content) => content.getBoundingClientRect().height))
        track.style.setProperty('--project-card-height', `${Math.ceil(tallest / 2)}px`)
      })
    }
    const observer = new ResizeObserver(updateHeight)
    contents.forEach((content) => observer.observe(content))
    updateHeight()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const track = projectsRef.current
    const updateArrows = () => {
      // Allow a pixel of rounding when comparing fractional card widths.
      const previous = track.scrollLeft > 1
      const next = track.scrollWidth - track.clientWidth - track.scrollLeft > 1
      setProjectScroll((current) => current.previous === previous && current.next === next
        ? current
        : { previous, next })
    }
    const observer = new ResizeObserver(updateArrows)
    observer.observe(track)
    for (const card of track.children) observer.observe(card)
    track.addEventListener('scroll', updateArrows, { passive: true })
    updateArrows()
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', updateArrows)
    }
  }, [])

  const scrollProjects = (direction) => {
    const track = projectsRef.current
    const cards = track.children
    const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth
    track.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }


  return (
    <div className="project-carousel" role="region" aria-label="Project carousel">
      <button className="project-arrow" type="button" aria-label="Previous project" aria-controls="project-track" disabled={!projectScroll.previous} onClick={() => scrollProjects(-1)}>
        <span aria-hidden="true">&#8249;</span>
      </button>
      <div className="project-track" id="project-track" ref={projectsRef} tabIndex={0} aria-label="Projects; scroll to see more">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-card-content">
            <h3>{project.title}</h3>
            <div className={`project-images${project.imageLayout === 'row' ? ' project-images-row' : ''}`}>
              {(Array.isArray(project.image) ? project.image : [project.image]).filter(Boolean).map((image, index) => (
                <div className="project-image-item" key={`${image}-${index}`}>
                  <img className="project-image" src={mediaUrl(image)} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <p>{project.description}</p>
            {project.repository && (
              <a className="project-paper-link" href={project.repository} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            )}
            {project.paper && (
              <button className="project-paper-link" type="button" onClick={() => setActivePaper(project)}>
                {project.paperLabel || 'Read paper'}
              </button>
            )}
            </div>
          </article>
        ))}
      </div>
      <button className="project-arrow" type="button" aria-label="Next project" aria-controls="project-track" disabled={!projectScroll.next} onClick={() => scrollProjects(1)}>
        <span aria-hidden="true">&#8250;</span>
      </button>
      <dialog className="paper-dialog" ref={paperDialogRef} aria-labelledby="paper-title" onCancel={() => setActivePaper(null)} onClose={() => setActivePaper(null)}>
        {activePaper && (
          <div className="paper-viewer">
            <div className="paper-toolbar">
              <button className="paper-back" type="button" autoFocus onClick={() => setActivePaper(null)}>&#8592; Back</button>
              <h2 id="paper-title">{activePaper.title}</h2>
            </div>
            <object className="paper-document" data={mediaUrl(activePaper.paper)} type="application/pdf" aria-label={`${activePaper.title} PDF`}>
              <p>This browser cannot display the PDF. <a href={mediaUrl(activePaper.paper)} download>Download PDF</a> to read it.</p>
            </object>
          </div>
        )}
      </dialog>
    </div>
  )
}
