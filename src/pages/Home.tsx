import React, { useState } from 'react'
import SwipeableMarket from '../components/SwipeableMarket'

function Home() {
  const [markets] = useState([
    { 
      id: 1, 
      title: "Will BTC reach $100k by end of 2024?", 
      probability: 65, 
      volume: 250000,
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      id: 2, 
      title: "Will SpaceX launch Starship successfully in 2024?", 
      probability: 80, 
      volume: 180000,
      image: "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    { 
      id: 3, 
      title: "Will the US Federal Reserve cut rates in Q3 2024?", 
      probability: 55, 
      volume: 300000,
      image: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
  ])

  return <SwipeableMarket markets={markets} />
}

export default Home