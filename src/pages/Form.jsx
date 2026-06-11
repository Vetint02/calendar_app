import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/form.css';
import ModalContext from '../contexts/ModalContext.jsx';

export default function CalendarForm() {
    const { modalData } = useContext(ModalContext);
    const navigate = useNavigate();
    const { state } = useLocation()

    const [notice, setNotice] = useState('');
    const [day, setDay] = useState(modalData.day);
    const [month, setMonth] = useState(modalData.month + 1);
    const [year, setYear] = useState(modalData.year);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/content/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ day, month, year, notice }),
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/', { state: { returnMonth: modalData.month, returnYear: modalData.year } });
            } else {
                console.error('Failed to save note');
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    }

    return (
        <div className="calendar-form-container">
            {modalData && (
                <h2 className="calendar-form-date-header">
                    {modalData.month + 1} / {modalData.day} / {modalData.year}
                </h2>
            )}

            <div className="input-row">
                <input type="number" value={month} onChange={e => setMonth(e.target.value)} placeholder="Month" />
                <input type="number" value={day} onChange={e => setDay(e.target.value)} placeholder="Day" />
                <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="Year" />
            </div>

            <div>
                <textarea value={notice} onChange={e => setNotice(e.target.value)} placeholder="Write your note here..." />
            </div>

            <button className="calendar-save-btn" onClick={handleSubmit}>Save Note</button>
        </div>
    )
}