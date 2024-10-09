import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreatePrediction from './pages/CreatePrediction'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-prediction" element={<CreatePrediction />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App