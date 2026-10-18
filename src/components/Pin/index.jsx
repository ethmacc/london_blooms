import './pin.css'

function Pin({ name, trees, lat, lng, imageUrl, onHoverEnter, onHoverLeave }) {
  return (
    <div
      className="pin"
      style={{
        '--pin-lat': lat,
        '--pin-lng': lng,
      }}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
    >
      <div className="pin-tooltip">
        <img src={imageUrl} alt="Cherry blossom" className="pin-image" />
        <div className="pin-info">
          <h4 className="pin-name">{name}</h4>
          <p className="pin-trees">{trees} trees</p>
        </div>
      </div>
    </div>
  )
}

export default Pin
