import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Admin from './pages/Admin'

import PrivateRoute from './components/PrivateRoute';
import { LoadPhotosProvider } from './contexts/LoadPhotosContext'
import { AuthProvider } from './contexts/AuthContext'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadPhotosProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sobre" element={<About />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}/>
        </Routes>
      </AuthProvider>
      </LoadPhotosProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
