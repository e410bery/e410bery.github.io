import { useEffect, useRef, useState } from 'react'

export default function Projects() {
  const projectsRef = useRef(null)
  const [projectScroll, setProjectScroll] = useState({ previous: false, next: false })

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
        {[1, 2, 3, 4].map((number) => (
          <article className="project-card" key={number}>
            <h3>Project {number}</h3>
            <p>Add your project description here.</p>
          </article>
        ))}
      </div>
      <button className="project-arrow" type="button" aria-label="Next project" aria-controls="project-track" disabled={!projectScroll.next} onClick={() => scrollProjects(1)}>
        <span aria-hidden="true">&#8250;</span>
      </button>
    </div>
  )
}
