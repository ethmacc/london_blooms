import React from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import locationsData from '../../data/locations.json'
import './map.css'

function MapComponent({ locationsKey = 'locations', onError }) {
  const containerRef = React.useRef(null)
  const onErrorRef = React.useRef(onError)
  onErrorRef.current = onError

  React.useEffect(() => {
    if (!maplibregl) return

    const locations = locationsData[locationsKey]
    if (!Array.isArray(locations) || locations.length === 0) {
      onErrorRef.current?.('No map locations are available')
      return undefined
    }
    const latitudes = locations.map(l => l.lat)
    const longitudes = locations.map(l => l.lng)
    const minLat = Math.min(...latitudes)
    const maxLat = Math.max(...latitudes)
    const minLng = Math.min(...longitudes)
    const maxLng = Math.max(...longitudes)
    const centroidLat = (minLat + maxLat) / 2
    const centroidLng = (minLng + maxLng) / 2

    let map
    let mapLoaded = false
    try {
      map = new maplibregl.Map({
        container: containerRef.current,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [centroidLng, centroidLat],
        zoom: 12,
      })
    } catch (error) {
      onErrorRef.current?.(error.message || 'Failed to initialize the map')
      return undefined
    }

    map.on('error', (event) => {
      if (!mapLoaded) onErrorRef.current?.(event.error?.message || 'Failed to load the map')
    })

    map.on('load', () => {
      mapLoaded = true
      try {
      const features = locations.map((location, index) => ({
        type: 'Feature',
        id: index,
        geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
        properties: { index },
      }))

      map.addSource('locations', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features },
      })
      map.addLayer({
        id: 'location-pins',
        type: 'circle',
        source: 'locations',
        paint: {
          'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 12, 9],
          'circle-color': '#D47694',
          'circle-stroke-color': '#F5E6D3',
          'circle-stroke-width': 3,
        },
      })

      const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 16, maxWidth: '320px' })
      let hoveredFeatureId = null
      map.on('mouseenter', 'location-pins', () => { map.getCanvas().style.cursor = 'pointer' })
      map.on('mousemove', 'location-pins', (event) => {
        const feature = event.features?.[0]
        const location = feature && locations[Number(feature.properties.index)]
        if (!location) return
        if (hoveredFeatureId !== null && hoveredFeatureId !== feature.id) {
          map.setFeatureState({ source: 'locations', id: hoveredFeatureId }, { hover: false })
        }
        hoveredFeatureId = feature.id
        map.setFeatureState({ source: 'locations', id: hoveredFeatureId }, { hover: true })

        const content = document.createElement('div')
        content.className = 'map-pin-popup'
        const blossom = document.createElement('span')
        blossom.className = 'map-pin-popup-image'
        blossom.setAttribute('role', 'img')
        blossom.setAttribute('aria-label', 'Cherry blossoms')
        blossom.textContent = '🌸'
        const info = document.createElement('span')
        info.className = 'map-pin-popup-info'
        const name = document.createElement('strong')
        name.className = 'map-pin-popup-name'
        name.textContent = location.name
        const trees = document.createElement('span')
        trees.textContent = `${location.trees} trees`
        const date = document.createElement('span')
        date.className = 'map-pin-popup-date'
        date.textContent = location.bloomDate || 'Bloom date to be confirmed'
        info.append(name, trees, date)
        content.append(blossom, info)
        popup.setLngLat(event.lngLat).setDOMContent(content).addTo(map)
      })
      map.on('mouseleave', 'location-pins', () => {
        map.getCanvas().style.cursor = ''
        if (hoveredFeatureId !== null) {
          map.setFeatureState({ source: 'locations', id: hoveredFeatureId }, { hover: false })
          hoveredFeatureId = null
        }
        popup.remove()
      })

      map.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
        padding: { top: 64, right: 64, bottom: 72, left: 64 },
        maxZoom: 11.7,
        duration: 0,
      })
      } catch (error) {
        onErrorRef.current?.(error.message || 'Failed to prepare the map')
      }
    })

    return () => { if (map) map.remove() }
  }, [])

  return <div ref={containerRef} className="map-canvas" aria-label="Interactive map of cherry blossom locations" />
}

export default MapComponent
