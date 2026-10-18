import React from 'react'
import './pin.css'

function Pin({ name, trees, lat, lng, imageUrl, bloomDate }) {
  return (
    <div
      className="pin"
      style={{
        '--pin-lat': lat,
        '--pin-lng': lng,
      }}
    >
      <div className="pin-tooltip">
        <img src={imageUrl} alt="Cherry blossom" className="pin-image" />
        <div className="pin-info">
          <h4 className="pin-name">{name}</h4>
          <p className="pin-trees">{trees} trees</p>
          {bloomDate && <p className="pin-date">{bloomDate}</p>}
        </div>
      </div>
    </div>
  )
}

export default Pin
