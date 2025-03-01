// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'  // 正确导入默认导出
import './styles/Home.css'
import './styles/ChatMessage.css'
import './styles/SidePanel.css'
import './styles/HerbGallery.css'
import './styles/LandingPage.css'
import './styles/ModernChat.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)