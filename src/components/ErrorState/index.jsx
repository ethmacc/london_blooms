import React from 'react'
import './error-state.css'

function ErrorState({ onRetry }) {
  return (
    <div className="error-state">
      <img src="/assets/lucky-cat.svg" alt="Lucky cat" className="error-lucky-cat" />
      <p className="error-eyebrow pixel-label">A LITTLE MAP MISHAP</p>
      <h1 className="error-message">gomenasorry</h1>
      <p className="error-desc">Something went wrong. Let's try again!</p>
      <button onClick={onRetry} className="retry-btn">
        Try Again
      </button>
    </div>
  )
}

export default ErrorState
