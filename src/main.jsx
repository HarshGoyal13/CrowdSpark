import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Web3Provider from './context/Web3Provider.jsx'
import {Toaster} from "react-hot-toast"


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Web3Provider>
  <StrictMode>
    <Toaster/>
    <App />
  </StrictMode>
  </Web3Provider>
  </BrowserRouter>
)
