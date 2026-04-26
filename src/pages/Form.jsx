import {useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import ModalContext from '../contexts/ModalContext.jsx';

export default function calendarForm(){
    const { modalData } = useContext(ModalContext)
    return (
        <div>
            <h2>{modalData[0].date.month[0]}, {modalData[0].date.day}</h2>
            <form>
                <input type="text" placeholder="Add title"/>
            </form>
        </div>
    )
}