import React from 'react'
import historyContent from '../../data/history-content.json'
import './history.css'

function History() {
  return (
    <div className="history-page">
      <section className="history-hero">
        <span className="history-flower" aria-hidden="true"><img src="/assets/blossom-mark.svg" alt="" /></span>
        <p className="pixel-label">ROOTED IN FRIENDSHIP</p>
        <h1>A story in <em>blossom.</em></h1>
        <p>Cherry trees have been bringing a little Japan to London for generations. Here’s the story behind the spring colour.</p>
        <div className="history-hero-rule"><span /><span /><span /></div>
      </section>
      <section className="history-grid" aria-label="The history of cherry blossoms in London">
        {historyContent.map((item, index) => (
          <article key={item.title} className={`history-card history-card-${index + 1}`}>
            <div className="history-card-top"><span className="history-number">0{index + 1}</span><span className="pixel-label">{item.label}</span><span className="history-card-flower" aria-hidden="true">✿</span></div>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
      <p className="history-footer"><span>✿</span> A small reminder that the best stories come back around each spring.</p>
      <p className="history-source">Stories adapted from <a href="https://www.royalparks.org.uk/read-watch-listen/ten-things-you-might-not-know-about-cherry-trees" target="_blank" rel="noreferrer">The Royal Parks</a>.</p>
    </div>
  )
}

export default History
