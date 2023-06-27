import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Admin from './pages/Admin'
import ForgotPassword from './pages/ForgotPassword'

import PrivateRoute from './components/PrivateRoute';
import { LoadDataProvider } from './contexts/LoadDataContext'
import { AuthProvider } from './contexts/AuthContext'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadDataProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sobre" element={<About />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/login/redefinir_senha" element={<ForgotPassword />}/>
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}/>
        </Routes>
      </AuthProvider>
      </LoadDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
