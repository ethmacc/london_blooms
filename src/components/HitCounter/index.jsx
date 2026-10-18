import React, { useEffect, useRef, useState } from 'react'
import './hit-counter.css'

function readCount() {
  try { return Number.parseInt(window.localStorage.getItem('bloomsVisitorCount') || '0', 10) || 0 }
  catch { return 0 }
}

function HitCounter() {
  const [count, setCount] = useState(readCount)
  const hasCounted = useRef(false)

  useEffect(() => {
    if (hasCounted.current) return
    hasCounted.current = true
    const nextCount = readCount() + 1
    try { window.localStorage.setItem('bloomsVisitorCount', String(nextCount)) } catch { /* Count stays session-only when storage is unavailable. */ }
    setCount(nextCount)
  }, [])

  return (
    <div className="hit-counter" aria-label={`You are visitor number ${count}`}>
      <img src="/assets/lucky-cat.svg" alt="Lucky cat" className="lucky-cat" />
      <span className="counter-copy"><span className="pixel-label">BLOSSOM VISITOR</span><b>{String(count).padStart(4, '0')}</b></span>
      <span className="counter-flower" aria-hidden="true">✿</span>
    </div>
  )
}

export default HitCounter
