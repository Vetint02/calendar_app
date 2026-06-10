import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import ModalPopup from './components/ModalPopup.jsx'
import AuthenticateRoutes from './components/authentication.jsx'
import ModalContext from './contexts/ModalContext.jsx'
import Home from './pages/Home.jsx'
import Form from './pages/Form.jsx'
import Contact from './pages/contact.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(true);

  return (
    <div>
      <nav className="nav_links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <ModalContext value={{ modalOpen, setModalOpen, modalData, setModalData }}>
        <ModalPopup />
        <Routes>
          <Route element={<AuthenticateRoutes isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ModalContext>
    </div>
  )
}

export default App
