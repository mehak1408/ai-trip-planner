import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Groq from "groq-sdk"

dotenv.config()

// --------------------
// App setup
// --------------------
const app = express()
app.use(cors())
app.use(express.json())

// --------------------
// Groq client
// --------------------
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// --------------------
// Health check route
// --------------------
app.get("/", (req, res) => {
  res.send("Backend running 🚀")
})

// --------------------
// Generate Itinerary API
// --------------------
app.post("/generate-itinerary", async (req, res) => {
  const { destination, days, budget, people } = req.body

  // Basic validation
  if (!destination || !days || !budget || !people) {
    return res.status(400).json({
      error: "Missing required trip details",
    })
  }

  try {
    const prompt = `
Create a ${days}-day travel itinerary for ${destination}.

Traveler type: ${people}
Budget level: ${budget}

Return the response STRICTLY in the following JSON format:

{
  "destination": "${destination}",
  "days": [
    {
      "day": 1,
      "morning": "",
      "afternoon": "",
      "evening": "",
      "food": [],
      "tip": ""
    }
  ]
}

Rules:
- Return ONLY valid JSON
- No extra text
- No markdown
- No explanations
`

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    res.json({
      itinerary: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: "Failed to generate itinerary",
    })
  }
})

// --------------------
// Start server
// --------------------
app.listen(5000, () => {
  console.log("Server running at port 5000")
})