import React from 'react'
import './navbar.css'

function Navbar({ onNav, currentPage }) {
  return (
    <nav className="navbar">
      <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); onNav('home') }} aria-label="London Blooms home">
        <span className="brand-mark"><img src="/assets/blossom-mark.svg" alt="" /></span>
        <span className="brand-wordmark">london <b>blooms</b><small>CHERRY BLOSSOM FORECAST</small></span>
      </a>
      <div className="nav-right">
        <span className="nav-season"><span className="season-dot" /> SPRING 2027</span>
        <button onClick={() => onNav(currentPage === 'history' ? 'home' : 'history')} className="nav-btn">
          {currentPage === 'history' ? (
            <><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg> Back to map</>
          ) : (
            <>The story <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
