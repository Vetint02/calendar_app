import { useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import ModalPopup from './components/ModalPopup.jsx'
import ModalContext from './contexts/ModalContext.jsx'
import Home from './components/Home.jsx'
import NotFound from './components/NotFound.jsx'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null)

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
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ModalContext>
    </div>
  )
}

export default App
