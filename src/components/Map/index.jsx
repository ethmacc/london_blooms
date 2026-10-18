import * as maplibregl from 'maplibre-gl'
import './map.css'
import Pin from '../Pin/index.jsx'

function MapComponent({ locationsKey = 'locations' }) {
  const locations = window.londonBloomLocations || []
  const mapRef = React.useRef(null)
  const map = React.useRef(null)

  React.useEffect(() => {
    window.londonBloomLocations = locations
  }, [])

  React.useEffect(() => {
    if (!mapRef.current) return
    
    // Create map centered on London
    map.current = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0.09, 51.5074],
      zoom: 12,
    })

    map.current.on('load', () => {
      // Add pins to the map
      locations.forEach((location, index) => {
        const pin = document.getElementById(`pin-${index}`)
        if (pin) {
          new maplibregl.Marker({ element: pin, className: 'custom-pin' })
            .setLngLat([location.lng, location.lat])
            .addTo(map.current)
        }
      })
    })

    map.current.on('style.load', () => {
      // Add custom pin style
      map.current.addSource('pins', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locations.map((location, index) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [location.lng, location.lat],
            },
            properties: {
              index: index,
            },
          })),
        },
      })

      map.current.addLayer({
        id: 'pins',
        type: 'circle',
        source: 'pins',
        paint: {
          'circle-radius': 8,
          'circle-color': '#D47694',
        },
      })
    })

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {locations.map((location, index) => (
          <Pin
            key={index}
            id={`pin-${index}`}
            name={location.name}
            trees={location.trees}
            lat={location.lat}
            lng={location.lng}
            imageUrl={`https://placehold.co/60x60/D47694/FFFFFF?text=%E2%98%85`}
            onHoverEnter={() => {}}
            onHoverLeave={() => {}}
          />
        ))}
      </div>
    </div>
  )
}

export default Map
