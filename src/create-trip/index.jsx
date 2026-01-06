import React, { useState, useRef } from 'react'

function Createtrip() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState('')
  const [people, setPeople] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState(null)

  const itineraryRef = useRef(null)

  // Fetch location suggestions
  const fetchPlaces = async (value) => {
    setQuery(value)
    if (value.length < 3) {
      setResults([])
      return
    }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5`
    )
    const data = await res.json()
    setResults(data)
  }

  const budgetOptions = [
    { label: 'Low', desc: 'Budget friendly 💸' },
    { label: 'Moderate', desc: 'Balanced ✨' },
    { label: 'High', desc: 'Luxury 💎' },
  ]

  const peopleOptions = [
    { label: 'Single', emoji: '🧍' },
    { label: 'Couple', emoji: '💑' },
    { label: 'Friends', emoji: '👫' },
    { label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  ]

  const handleGenerateTrip = async () => {
    if (!query || !budget || !people || days < 1) {
      setError('Please fill all details to generate your trip.')
      return
    }

    setError('')
    setLoading(true)
    setItinerary(null)

    try {
      const res = await fetch('http://localhost:5000/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: query,
          days,
          budget,
          people,
        }),
      })

      const data = await res.json()
      const parsed = JSON.parse(data.itinerary)
      setItinerary(parsed)

      setTimeout(() => {
        itineraryRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // helper to safely render text or object.option
  const renderText = (value) =>
    typeof value === 'string' ? value : value?.option || ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-white">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 py-10">
        <h2 className="text-3xl font-bold">Tell us your travel preferences</h2>
        <p className="text-xl mt-3 text-gray-700">
          Just provide some basic information, and our trip planner will generate
          a customized itinerary for you
        </p>

        {/* Destination */}
        <div className="mt-10 relative w-[360px]">
          <h2 className="text-xl my-3 font-medium">What is your destination?</h2>
          <input
            type="text"
            value={query}
            onChange={(e) => fetchPlaces(e.target.value)}
            placeholder="Enter destination"
            className="w-full p-3 rounded-xl border border-gray-300"
          />
          {results.length > 0 && (
            <ul className="absolute z-10 bg-white w-full mt-2 rounded-xl shadow border">
              {results.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => {
                    setQuery(place.display_name)
                    setResults([])
                  }}
                  className="p-3 hover:bg-blue-100 cursor-pointer text-sm"
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Days */}
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-3">
            How many days are you planning?
          </h2>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDays(days > 1 ? days - 1 : 1)}
              className="w-10 h-10 bg-white shadow rounded-full"
            >
              −
            </button>
            <span className="text-2xl font-semibold">{days} Days</span>
            <button
              onClick={() => setDays(days + 1)}
              className="w-10 h-10 bg-white shadow rounded-full"
            >
              +
            </button>
          </div>
        </div>

        {/* Budget */}
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-4">What’s your budget?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {budgetOptions.map((b) => (
              <div
                key={b.label}
                onClick={() => setBudget(b.label)}
                className={`p-5 rounded-2xl cursor-pointer border ${
                  budget === b.label
                    ? 'bg-orange-500 text-white'
                    : 'bg-white'
                }`}
              >
                <h3 className="font-semibold">{b.label}</h3>
                <p className="text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* People */}
        <div className="mt-10">
          <h2 className="text-xl font-medium mb-4">
            Who are you traveling with?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {peopleOptions.map((p) => (
              <div
                key={p.label}
                onClick={() => setPeople(p.label)}
                className={`p-4 rounded-2xl border cursor-pointer text-center ${
                  people === p.label
                    ? 'bg-orange-500 text-white'
                    : 'bg-white'
                }`}
              >
                <div className="text-3xl">{p.emoji}</div>
                <p>{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="mt-6 text-red-600">{error}</p>}

        <button
          onClick={handleGenerateTrip}
          className="mt-6 px-10 py-4 bg-orange-500 text-white rounded-2xl"
        >
          {loading ? 'Generating...' : 'Generate Trip'}
        </button>

        {/* Itinerary */}
        {itinerary && (
          <div ref={itineraryRef} className="mt-10 space-y-6">
            <h2 className="text-3xl font-bold">
              Your {itinerary.destination} Trip Plan
            </h2>

            {itinerary.days.map((day) => (
              <div key={day.day} className="p-6 bg-white rounded-2xl shadow">
                <h3 className="text-xl font-semibold mb-3">
                  Day {day.day}
                </h3>

                <p>🌅 <strong>Morning:</strong> {renderText(day.morning)}</p>
                <p>🌞 <strong>Afternoon:</strong> {renderText(day.afternoon)}</p>
                <p>🌙 <strong>Evening:</strong> {renderText(day.evening)}</p>

                <ul className="list-disc ml-6 mt-2">
                  {day.food.map((f, i) => (
                    <li key={i}>{renderText(f)}</li>
                  ))}
                </ul>

                <p className="mt-2 text-blue-600">
                  💡 <strong>Tip:</strong> {renderText(day.tip)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Createtrip