import { useState, useEffect, useCallback } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import ModalPopup from './components/ModalPopup.jsx'
import AuthenticateRoutes from './components/authentication.jsx'
import ModalContext from './contexts/ModalContext.jsx'
import AuthenticationContext from './contexts/AuthenticationContext.jsx'
import Nav from './components/NavComponent.jsx'
import Home from './pages/Home.jsx'
import Form from './pages/Form.jsx'
import EditForm from './pages/EditForm.jsx'
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
  const [modalData, setModalData] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noticeCounts, setNoticeCounts] = useState({});

  useEffect(() => {
    async function isLoggedIn() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        if (response.ok && data.isAuthenticated) {
          setAuthentication(true);
        } else {
          setAuthentication(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
    isLoggedIn();
  }, []);

  const refreshCounts = useCallback(async (month, year) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/content/month?month=${month + 1}&year=${year}`,
        { credentials: 'include' }
      );
      if (response.ok) {
        const data = await response.json();
        const counts = {};
        data.forEach(item => {
          counts[item.day] = (counts[item.day] || 0) + 1;
        });
        setNoticeCounts(counts);
      }
    } catch (error) {
      console.error('Failed to fetch month notices:', error);
    }
  }, []);

  if (isLoading) return (
    <Box className="loading">
      <CircularProgress />
    </Box>
  );

  return (
    <div>
      <ModalContext value={{ modalOpen, setModalOpen, modalData, setModalData, noticeCounts, refreshCounts }}>
        <AuthenticationContext value={{ isAuthenticated, setAuthentication }}>
          <Nav />
          <ModalPopup />
          <Routes>
            <Route element={<AuthenticateRoutes isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<Form />} />
              <Route path="/form/edit" element={<EditForm />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthenticationContext>
      </ModalContext>
      <footer className="about-footer">
        <p>&copy; 2026 Roy Park. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;