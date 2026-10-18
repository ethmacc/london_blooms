import React from 'react'
import './history.css'

const historyContent = [
  {
    title: 'A first bloom',
    label: 'THE BEGINNING',
    text: "Cherry blossoms first appeared in London in 1883, when the British consul to Japan, Sir Robert Alcock, presented a Japanese cherry tree to the people of London as a gesture of gratitude for the British support during the Anglo-Japanese War. The tree was planted in St. James's Park, where it still grows today.",
  },
  {
    title: 'A gift that grew',
    label: 'FRIENDSHIP',
    text: 'The exchange of cherry trees between Japan and Britain continues to this day. In 1999, Japan gifted 3,000 cherry trees to the UK as part of the Millennium Gift. These trees are planted across London, from Regent’s Park to Hyde Park.',
  },
  {
    title: 'Meet the blossom',
    label: 'THE TREES',
    text: "The cherry trees in London are primarily Yoshino cherry trees (Prunus × yedoensis), known for their spectacular pink blossoms. Unlike Japanese varieties, London's trees bloom earlier due to the warmer climate. The first blooms typically appear in late March, with peak bloom occurring in early April.",
  },
  {
    title: 'Spring, shared',
    label: 'CULTURE',
    text: "London's cherry blossoms have become an important symbol of British-Japanese friendship. The annual Cherry Blossom Festival in Hyde Park and Kensington Gardens draws visitors from around the world, celebrating the beautiful trees that bloom each spring.",
  },
]

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
    </div>
  )
}

export default History
