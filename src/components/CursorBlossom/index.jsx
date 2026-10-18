import React from 'react'
import './cursor-blossom.css'

function CursorBlossom() {
  const blossomRef = React.useRef(null)

  React.useEffect(() => {
    const moveBlossom = (event) => {
      const element = blossomRef.current
      if (!element) return
      element.style.transform = `translate3d(${event.clientX + 15}px, ${event.clientY + 12}px, 0) rotate(-12deg)`
      element.classList.add('cursor-blossom-visible')
    }
    window.addEventListener('pointermove', moveBlossom, { passive: true })
    return () => window.removeEventListener('pointermove', moveBlossom)
  }, [])

  return <img ref={blossomRef} className="cursor-blossom" src="/assets/blossom-mark.svg" alt="" aria-hidden="true" />
}

export default CursorBlossom
