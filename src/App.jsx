import { useState, useEffect } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import ModalPopup from './components/ModalPopup.jsx'
import AuthenticateRoutes from './components/authentication.jsx'
import ModalContext from './contexts/ModalContext.jsx'
import AuthenticationContext from './contexts/AuthenticationContext.jsx'
import Nav from './components/NavComponent.jsx'
import Home from './pages/Home.jsx'
import Form from './pages/Form.jsx'
import About from './pages/About.jsx'
import Contact from './pages/contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/register.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // remove later when database is fully connected
  const [isAuthenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function isLoggedIn() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: "GET",
          credentials: "include"
        })

        const data = await response.json()

        if (response.ok && data.isAuthenticated) {
          setAuthentication(true)
        }
        else {
          setAuthentication(false)
        }
      }
      catch (error) {
        console.error("Auth check failed:", error)
      }
      finally {
        setIsLoading(false);
      }
    }
    isLoggedIn();
  }, [])

  if (isLoading) return (
    <Box className="loading">
      <CircularProgress />
    </Box>
  )

  return (
    <div>
      <ModalContext value={{ modalOpen, setModalOpen, modalData, setModalData }}>
        <AuthenticationContext value={{ isAuthenticated, setAuthentication }}>
          <Nav />
          <ModalPopup />
          <Routes>
            <Route element={<AuthenticateRoutes isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<Form />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthenticationContext>
      </ModalContext>
    </div>
  )
}

export default App
