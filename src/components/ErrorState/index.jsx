import React from 'react'
import './error-state.css'

function ErrorState({ onRetry }) {
  return (
    <div className="error-state">
      <img 
        src="https://placehold.co/200x200/8B6F47/FFFFFF?text=%F0%9F%90%8D" 
        alt="Lucky Cat" 
        className="error-lucky-cat"
      />
      <h1 className="error-message">gomenasorry</h1>
      <p className="error-desc">Something went wrong. Let's try again!</p>
      <button onClick={onRetry} className="retry-btn">
        Try Again
      </button>
    </div>
  )
}

export default ErrorState
