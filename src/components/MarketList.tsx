import React from 'react'
import { TrendingUp, DollarSign } from 'lucide-react'

interface Market {
  id: number
  title: string
  probability: number
  volume: number
}

interface MarketListProps {
  markets: Market[]
}

const MarketList: React.FC<MarketListProps> = ({ markets }) => {
  return (
    <div className="space-y-6">
      {markets.map((market) => (
        <div key={market.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{market.title}</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-lg font-medium">{market.probability}%</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-lg font-medium">${market.volume.toLocaleString()}</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            Trade Now
          </button>
        </div>
      ))}
    </div>
  )
}

export default MarketList