import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-linea-blue text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <TrendingUp className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-display font-bold">Linea.bet</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/create-prediction"
            className="bg-white text-linea-blue px-4 py-2 rounded-full font-semibold hover:bg-linea-light-blue transition-colors"
          >
            Create Prediction
          </Link>
          <button className="bg-linea-light-blue text-linea-blue px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-linea-blue transition-colors">
            Connect Wallet
          </button>
          <Menu className="h-6 w-6 md:hidden" />
        </div>
      </div>
    </header>
  )
}

export default Header