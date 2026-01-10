import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AppCntxtProvider from './context/AppCntxt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AppCntxtProvider>
      <App />
     </AppCntxtProvider>
      
    </BrowserRouter>
  </StrictMode>
)
