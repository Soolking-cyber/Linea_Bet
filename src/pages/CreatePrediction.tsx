import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY || ''

const CreatePrediction = () => {
  const navigate = useNavigate()
  const [prediction, setPrediction] = useState({
    title: '',
    probability: 50,
    volume: 10000,
    image: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPrediction(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (prediction.title.length > 3) {
        generateImage()
      }
    }, 500)

    return () => clearTimeout(debounce)
  }, [prediction.title])

  const generateImage = async () => {
    if (!prediction.title) return

    setIsLoading(true)
    try {
      if (UNSPLASH_ACCESS_KEY) {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(prediction.title)}&client_id=${UNSPLASH_ACCESS_KEY}`)
        const data = await response.json()
        setPrediction(prev => ({ ...prev, image: data.urls.regular }))
      } else {
        // Use a placeholder image if no API key is provided
        setPrediction(prev => ({ ...prev, image: `https://via.placeholder.com/800x600?text=${encodeURIComponent(prediction.title)}` }))
      }
    } catch (error) {
      console.error('Error fetching image:', error)
      // Use a placeholder image if there's an error
      setPrediction(prev => ({ ...prev, image: `https://via.placeholder.com/800x600?text=${encodeURIComponent(prediction.title)}` }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New prediction:', prediction)
    navigate('/')
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-display font-bold mb-6 text-center text-linea-blue">Create a New Prediction</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-linea-black text-sm font-bold mb-2" htmlFor="title">
            Prediction Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-linea-black leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter prediction title"
            name="title"
            value={prediction.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-linea-black text-sm font-bold mb-2" htmlFor="probability">
            Initial Probability: {prediction.probability}%
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-linea-black leading-tight focus:outline-none focus:shadow-outline"
            id="probability"
            type="range"
            min="0"
            max="100"
            name="probability"
            value={prediction.probability}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-linea-black text-sm font-bold mb-2" htmlFor="volume">
            Initial Volume ($)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-linea-black leading-tight focus:outline-none focus:shadow-outline"
            id="volume"
            type="number"
            placeholder="Enter initial volume"
            name="volume"
            value={prediction.volume}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          {isLoading ? (
            <div className="text-center text-linea-blue">Generating image...</div>
          ) : prediction.image && (
            <div className="mt-4">
              <img src={prediction.image} alt="Prediction" className="w-full h-48 object-cover rounded" />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-linea-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Prediction
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePrediction