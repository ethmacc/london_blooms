import './navbar.css'

function Navbar({ onNav }) {
  return (
    <nav className="navbar">
      <button onClick={() => onNav('history')} className="nav-btn">
        History
      </button>
    </nav>
  )
}

export default Navbar
