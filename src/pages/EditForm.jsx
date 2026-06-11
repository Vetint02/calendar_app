import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/form.css';

export default function CalendarEditForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { editId, editData, modalData } = state || {};

    const [notice, setNotice] = useState(editData || '');
    const [day, setDay] = useState(modalData.day);
    const [month, setMonth] = useState(modalData.month + 1);
    const [year, setYear] = useState(modalData.year);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/content/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editId, day, month, year, notice }),
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/', { state: { returnMonth: modalData.month, returnYear: modalData.year } });
            } else {
                console.error('Failed to update note');
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    }

    function handleCancel() {
        navigate('/', { state: { returnMonth: modalData.month, returnYear: modalData.year } });
    }

    if (!state) {
        return (
            <div className="calendar-form-container">
                <p style={{ textAlign: 'center', color: '#a3a3a3' }}>No event data found.</p>
                <button className="calendar-save-btn" onClick={() => navigate('/')}>Go Back</button>
            </div>
        );
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
                <textarea value={notice} onChange={e => setNotice(e.target.value)} placeholder="Edit your note here..." />
            </div>

            <div className="calendar-form-btn-group">
                <button className="calendar-save-btn" onClick={handleSubmit}>Save Changes</button>
                <button className="calendar-cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}