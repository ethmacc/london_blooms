import React from 'react'
import './home.css'
import MapComponent from '../../components/Map/index.jsx'
import FallingBlossoms from '../../components/FallingBlossoms/index.jsx'

function Home({ prediction, onHitCounter }) {
  return (
    <div className="home-page">
      <FallingBlossoms />
      <div className="onboarding">
        <h1 className="onboarding-title">London Cherry Blossom Predictor</h1>
        {prediction ? (
          <div className="prediction-box">
            <h2 className="prediction-label">Predicted Bloom Date</h2>
            <p className="prediction-date">{prediction.nextBloomDate}</p>
            <p className="prediction-details">
              Days until bloom: {prediction.daysUntilBloom}
            </p>
            <p className="prediction-confidence">
              Confidence: {prediction.confidence}
            </p>
            <p className="prediction-temp">
              Expected Temperature: {prediction.temperature.avg}°C
            </p>
          </div>
        ) : (
          <p className="loading-text">Loading prediction...</p>
        )}
        <p className="onboarding-text">
          Explore 12 notable locations across London with our interactive map.
        </p>
      </div>
      <MapComponent locationsKey="locations" />
    </div>
  )
}

export default Home
