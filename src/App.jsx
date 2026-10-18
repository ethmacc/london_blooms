import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home/index.jsx'
import History from './pages/History/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import HitCounter from './components/HitCounter/index.jsx'
import ErrorState from './components/ErrorState/index.jsx'
import MapComponent from './components/Map/index.jsx'

function App({ maplibregl }) {
  const [currentPage, setCurrentPage] = useState('home')
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const loadPrediction = async () => {
      try {
        const response = await fetch('/data/prediction.json')
        if (mounted) {
          const data = await response.json()
          setPrediction(data)
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load prediction data')
        }
      }
    }
    loadPrediction()
    
    // Increment hit counter on mount
    const incrementHitCounter = () => {
      const current = parseInt(localStorage.getItem('bloomsVisitorCount') || '0', 10)
      localStorage.setItem('bloomsVisitorCount', (current + 1).toString())
    }
    incrementHitCounter()
    
    return () => {
      mounted = false
    }
  }, [])

  const handleNav = (page) => {
    setCurrentPage(page)
  }

  const handleBack = () => {
    setCurrentPage('home')
  }

  if (error) {
    return <ErrorState onRetry={() => window.location.reload()} />
  }

  return (
    <div className="app">
      <Navbar onNav={handleNav} />
      <main className="main-content">
        {currentPage === 'home' && <Home prediction={prediction} onHitCounter={() => {}} />}
        {currentPage === 'history' && <History onBack={handleBack} />}
      </main>
      <HitCounter />
    </div>
  )
}

export default App
