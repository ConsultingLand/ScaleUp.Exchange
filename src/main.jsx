import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Web3ModalProvider } from "./Web3ModalProvider.jsx";

import { BrowserRouter, } from "react-router-dom";
// import Navbar from './pages/Navbar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Web3ModalProvider>
    <BrowserRouter>
      {/* <Navbar/> */}
    <App />
    </BrowserRouter>
    </Web3ModalProvider>
  </React.StrictMode>,
)
