import React from 'react'
import './home.css'
import MapComponent from '../../components/Map/index.jsx'
import FallingBlossoms from '../../components/FallingBlossoms/index.jsx'
import CursorBlossom from '../../components/CursorBlossom/index.jsx'

function Home({ prediction }) {
  return (
    <div className="home-page">
      <FallingBlossoms />
      <CursorBlossom />
      <section className="home-intro" aria-labelledby="home-title">
        <p className="pixel-label intro-kicker"><span className="kicker-sparkle">✳</span> A LITTLE SPRING MAGIC</p>
        <h1 id="home-title">London is about to <em>blush.</em></h1>
        <p className="intro-copy">Follow the cherry blossom season across the city. Find a favourite spot, then let spring set the pace.</p>

        <article className="forecast-card">
          <div className="forecast-topline">
            <span className="forecast-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M7.5 3v4M16.5 3v4M4 9.5h16M8 13h2m4 0h2m-8 4h2"/></svg>
            </span>
            <span className="pixel-label">NEXT BLOOM WINDOW</span>
            <span className="forecast-live"><i /> FORECAST</span>
          </div>
          {prediction ? (
            <>
              <p className="forecast-date">{prediction.nextBloomDate}</p>
              <div className="forecast-meta">
                <span><b>{prediction.daysUntilBloom}</b> days to go</span>
                <span className="meta-divider" />
                <span>{prediction.confidence} confidence</span>
              </div>
            </>
          ) : <p className="loading-text">Gathering the first signs of spring…</p>}
          <div className="forecast-note"><span aria-hidden="true">✿</span> Nature keeps its own calendar. Dates are an estimate.</div>
        </article>

        <div className="intro-stats">
          <div className="intro-stat"><span className="stat-icon stat-icon-pink" aria-hidden="true">✿</span><span><b>12</b><small>blossom spots</small></span></div>
          <div className="intro-stat"><span className="stat-icon stat-icon-green" aria-hidden="true">⌖</span><span><b>London</b><small>your spring, mapped</small></span></div>
        </div>
        <p className="map-hint"><span className="hint-ring" /> Hover over a blossom pin to peek inside</p>
      </section>

      <section className="map-panel" aria-label="Map of cherry blossom locations in London">
        <div className="map-panel-head">
          <div>
            <p className="pixel-label map-eyebrow">YOUR BLOSSOM GUIDE</p>
            <h2>Find your <span>spring spot</span></h2>
          </div>
          <div className="map-count"><img src="/assets/blossom-mark.svg" alt="" /> <b>12</b> places</div>
        </div>
        <div className="map-frame">
          <MapComponent locationsKey="locations" />
          <div className="map-compass" aria-hidden="true"><span>N</span><svg viewBox="0 0 24 24"><path d="m12 3 5 14-5-3-5 3 5-14Z"/></svg></div>
          <div className="map-legend"><span className="legend-dot" /> Cherry blossom locations</div>
        </div>
        <p className="map-caption"><span>✦</span> Little pockets of pink, all across the city.</p>
      </section>
    </div>
  )
}

export default Home
