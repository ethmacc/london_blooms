import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as maplibregl from 'maplibre-gl'

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || null

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App maplibregl={maplibregl} accessToken={MAPBOX_ACCESS_TOKEN} />
  </React.StrictMode>,
)
