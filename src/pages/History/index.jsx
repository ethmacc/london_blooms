import React from 'react'
import './history.css'

function History({ onBack }) {
  const historyContent = [
    {
      title: "Origins in London",
      text: "Cherry blossoms first appeared in London in 1883, when the British consul to Japan, Sir Robert Alcock, presented a Japanese cherry tree to the people of London as a gesture of gratitude for the British support during the Anglo-Japanese War. The tree was planted in St. James's Park, where it still grows today."
    },
    {
      title: "Diplomatic Exchanges",
      text: "The exchange of cherry trees between Japan and Britain continues to this day. In 1999, Japan gifted 3,000 cherry trees to the UK as part of the Millennium Gift. These trees are planted across London, from Regent's Park to Hyde Park."
    },
    {
      title: "Special Characteristics",
      text: "The cherry trees in London are primarily Yoshino cherry trees (Prunus × yedoensis), known for their spectacular pink blossoms. Unlike Japanese varieties, London's trees bloom earlier due to the warmer climate. The first blooms typically appear in late March, with peak bloom occurring in early April."
    },
    {
      title: "Cultural Impact",
      text: "London's cherry blossoms have become an important symbol of British-Japanese friendship. The annual Cherry Blossom Festival in Hyde Park and Kensington Gardens draws visitors from around the world, celebrating the beautiful trees that bloom each spring."
    }
  ]

  return (
    <div className="history-page">
      <button onClick={onBack} className="back-btn">
        ← Back to Map
      </button>
      <h1 className="page-title">London Cherry Blossoms: A History</h1>
      <div className="history-content">
        {historyContent.map((item, index) => (
          <div key={index} className="history-section">
            <h2 className="section-title">{item.title}</h2>
            <p className="section-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
