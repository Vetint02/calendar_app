import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ModalContext from '../contexts/ModalContext.jsx';

export default function calendarForm() {
    const { modalData } = useContext(ModalContext)
    return (
        <div>
            <h2>{modalData[0].date.month[0]}, {modalData[0].date.day}</h2>
            <form action="http://localhost:5000/api/content/create" method="POST">
                <div>
                    <input type="number" id="year" name="year" placeholder="Title..."/>
                </div>
                <div>
                    <input type="number" id="month" name="month" placeholder="Title..."/>
                </div>
                <div>
                    <input type="number" id="day" name="day" placeholder="Title..."/>
                </div>
                <div>
                    <textarea id="notice" name="notice" placeholder="Write your note here..."></textarea>
                </div>
                <button type="submit">Save Note</button>
            </form>
        </div>
    )
}