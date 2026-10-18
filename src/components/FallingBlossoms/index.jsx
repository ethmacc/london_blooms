import React from 'react'
import './falling-blossoms.css'

function FallingBlossoms() {
  const [blossoms, setBlossoms] = React.useState([])

  React.useEffect(() => {
    const count = 22
    const newBlossoms = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      scale: 0.5 + Math.random() * 0.5,
    }))
    setBlossoms(newBlossoms)
  }, [])

  return (
    <div className="falling-blossoms">
      {blossoms.map((blossom) => (
        <div
          key={blossom.id}
          className="blossom"
          style={{
            '--blossom-left': blossom.left,
            '--blossom-delay': blossom.delay,
            '--blossom-duration': blossom.duration,
            '--blossom-scale': blossom.scale,
          }}
        />
      ))}
    </div>
  )
}

export default FallingBlossoms
