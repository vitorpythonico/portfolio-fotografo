import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'

import EmailBar from './components/EmailBar';
import Aside from './components/Aside';
import { LoadPhotosProvider } from './contexts/LoadPhotosContext'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <EmailBar />
      <LoadPhotosProvider>
        <Aside />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sobre" element={<About />}/>
        </Routes>
      </LoadPhotosProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
