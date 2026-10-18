import React from 'react'
import * as maplibregl from 'maplibre-gl'
import locationsData from '../../data/locations.json'

function MapComponent({ locationsKey = 'locations' }) {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    if (!maplibregl) return

    const locations = locationsData[locationsKey]
    const latitudes = locations.map(l => l.lat)
    const longitudes = locations.map(l => l.lng)
    const minLat = Math.min(...latitudes)
    const maxLat = Math.max(...latitudes)
    const minLng = Math.min(...longitudes)
    const maxLng = Math.max(...longitudes)
    const centroidLat = (minLat + maxLat) / 2
    const centroidLng = (minLng + maxLng) / 2

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [centroidLng, centroidLat],
      zoom: 12,
    })

    map.on('load', () => {
      const features = locations.map((location, index) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
        properties: { index, name: location.name, trees: location.trees, bloomDate: location.bloomDate },
      }))

      map.addSource('pins', { type: 'geojson', data: { type: 'FeatureCollection', features } })
      map.addLayer({ id: 'pins', type: 'circle', source: 'pins', paint: { 'circle-radius': 10, 'circle-color': '#D47694' } })

      locations.forEach((location, index) => {
        const popupContent = `<div style="background:#F5E6D3;color:#5C4A36;padding:12px;border-radius:6px;border:2px solid #8B6F47;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-family:monospace;font-size:12px;"><div style="font-weight:bold;color:#8B6F47;margin-bottom:4px;">${location.name}</div><div style="margin-bottom:3px;">${location.trees} trees</div><div style="color:#F4C430;font-style:italic;">${location.bloomDate}</div></div>`

        const marker = new maplibregl.Marker({ element: document.createElement('div'), color: '#D47694' })
          .setLngLat([location.lng, location.lat])
          .addTo(map)

        map.on('mouseenter', `pin-${index}`, (e) => {
          const feature = e.features[0]
          if (feature) {
            const popup = new maplibregl.Popup({ closeButton: false })
            popup.setHTML(popupContent)
            popup.setLngLat(e.lngLat)
            popup.addTo(map)
          }
        })

        map.on('mouseleave', `pin-${index}`, () => {
          const popup = map.getPopup()
          if (popup) {
            popup.remove()
          }
        })
      })
    })

    return () => { if (map) map.remove() }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%', background: '#2D5A3F' }} />
}

export default MapComponent
