# 🌍 AI Trip Planner

An AI-powered full-stack web application that generates **personalized, day-wise travel itineraries** based on user preferences such as destination, trip duration, budget, and travel group.

---

## 🚀 Features

- ✨ **AI-Generated Itineraries**  
  Creates customized, day-wise travel plans including morning, afternoon, and evening activities, food suggestions, and travel tips.

- 📍 **Real-Time Destination Search**  
  Integrated **OpenStreetMap (Nominatim API)** for live location search and accurate destination selection.

- 🎯 **User-Centric Inputs**  
  Choose number of days, budget type (Low / Moderate / High), and travel group (Single, Couple, Friends, Family).

- 🧩 **Structured & Beautiful UI**  
  Displays itineraries in clean, structured cards for better readability and user experience.

- ⚡ **Fast AI Responses**  
  Uses a low-latency LLM backend to generate itineraries in ~2 seconds.

- 📱 **Responsive Design**  
  Optimized for desktop and mobile devices.

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- JavaScript (ES6+)

### Backend
- Node.js  
- Express.js  

### AI Integration
- Groq API (LLM-powered itinerary generation)

### Maps & Location
- OpenStreetMap  
- Nominatim API (Geocoding & search)

---

## 🧠 How It Works

1. User enters travel preferences (destination, days, budget, people).
2. Destination suggestions are fetched in real time using OpenStreetMap.
3. Preferences are sent to the backend API.
4. The backend generates an AI-powered itinerary using an LLM.
5. The structured itinerary is returned and displayed as day-wise cards.

---
