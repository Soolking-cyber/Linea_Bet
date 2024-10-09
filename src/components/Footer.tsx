import React from 'react'
import { Twitter, Globe } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-linea-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-display font-bold mb-2">Linea.bet</h2>
            <p className="text-linea-gray">Decentralized Prediction Markets</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-display font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-linea-light-blue">Markets</a></li>
              <li><a href="#" className="hover:text-linea-light-blue">How It Works</a></li>
              <li><a href="#" className="hover:text-linea-light-blue">About Us</a></li>
              <li><a href="#" className="hover:text-linea-light-blue">Terms of Service</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-display font-semibold mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-linea-light-blue"><Twitter /></a>
              <a href="#" className="hover:text-linea-light-blue"><Globe /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-linea-gray">
          <p>&copy; 2024 Linea.bet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer