// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import './styles/Home.css'
import './styles/ChatMessage.css'
import './styles/SidePanel.css'
import './styles/HerbGallery.css'
import './styles/LandingPage.css'
import './styles/ModernChat.css'
import './components/MeridianChart.css'
import './components/SeasonalHealth.css'
import './components/PrescriptionFood.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)