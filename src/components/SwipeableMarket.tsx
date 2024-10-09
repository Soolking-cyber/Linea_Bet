import React, { useState, useRef, useEffect } from 'react'
import { TrendingUp, DollarSign } from 'lucide-react'

interface Market {
  id: number
  title: string
  probability: number
  volume: number
  image: string
}

interface SwipeableMarketProps {
  markets: Market[]
}

const SwipeableMarket: React.FC<SwipeableMarketProps> = ({ markets }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [betAmount, setBetAmount] = useState(100)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const currentMarket = markets[currentIndex]

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (direction === 'right') {
      console.log(`Bet ${betAmount} on ${currentMarket.title}`)
    } else if (direction === 'left') {
      console.log(`Passed on ${currentMarket.title}`)
    } else {
      console.log(`Skipped ${currentMarket.title}`)
    }
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % markets.length)
      setDragOffset({ x: 0, y: 0 })
    }, 300)
  }

  const handleDragStart = (clientX: number, clientY: number) => {
    setDragStart({ x: clientX, y: clientY })
  }

  const handleDragMove = (clientX: number, clientY: number) => {
    if (dragStart.x === 0 && dragStart.y === 0) return
    const offsetX = clientX - dragStart.x
    const offsetY = clientY - dragStart.y
    setDragOffset({ x: offsetX, y: offsetY })
  }

  const handleDragEnd = () => {
    const threshold = 100
    if (Math.abs(dragOffset.x) > threshold) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left')
    } else if (dragOffset.y < -threshold) {
      handleSwipe('up')
    } else {
      setDragOffset({ x: 0, y: 0 })
    }
    setDragStart({ x: 0, y: 0 })
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const touchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
    const touchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
    const touchEnd = () => handleDragEnd()

    const mouseDown = (e: MouseEvent) => handleDragStart(e.clientX, e.clientY)
    const mouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY)
    const mouseUp = () => handleDragEnd()

    card.addEventListener('touchstart', touchStart)
    card.addEventListener('touchmove', touchMove)
    card.addEventListener('touchend', touchEnd)
    card.addEventListener('mousedown', mouseDown)
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      card.removeEventListener('touchstart', touchStart)
      card.removeEventListener('touchmove', touchMove)
      card.removeEventListener('touchend', touchEnd)
      card.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', mouseUp)
    }
  }, [dragStart, dragOffset])

  return (
    <div className="w-full max-w-md relative">
      <div 
        ref={cardRef}
        className="bg-white rounded-lg shadow-xl overflow-hidden relative cursor-grab active:cursor-grabbing"
        style={{
          backgroundImage: `url(${currentMarket.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
          transition: dragStart.x === 0 && dragStart.y === 0 ? 'transform 0.3s ease' : 'none'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex flex-col justify-between p-6">
          <h2 className="text-2xl font-display font-bold text-white mb-4 text-center">{currentMarket.title}</h2>
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-linea-light-blue mr-2" />
                <span className="text-lg font-medium text-white">{currentMarket.probability}%</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-linea-light-blue mr-2" />
                <span className="text-lg font-medium text-white">${currentMarket.volume.toLocaleString()}</span>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="betAmount" className="block text-sm font-medium text-white mb-1">
                Bet Amount: ${betAmount}
              </label>
              <input
                type="range"
                id="betAmount"
                min="10"
                max="1000"
                step="10"
                value={betAmount}
                onChange={(e) => setBetAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-linea-light-blue rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-linea-blue font-display">
        Swipe right to bet, left to pass, up to skip
      </div>
    </div>
  )
}

export default SwipeableMarket