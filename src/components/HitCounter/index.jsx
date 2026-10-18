import React, { useState, useEffect } from 'react'
import './hit-counter.css'

function HitCounter() {
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem('bloomsVisitorCount') || '0', 10)
  })

  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('bloomsVisitorCount') || '0', 10)
    if (savedCount !== count) {
      setCount(savedCount)
    }
  }, [])

  useEffect(() => {
    const newCount = count + 1
    localStorage.setItem('bloomsVisitorCount', newCount.toString())
  }, [count])

  return (
    <div className="hit-counter">
      <img 
        src="https://placehold.co/40x40/8B6F47/FFFFFF?text=%F0%9F%90%8D" 
        alt="Lucky Cat" 
        className="lucky-cat"
      />
      <span className="counter-text">Visitors: {count}</span>
    </div>
  )
}

export default HitCounter
