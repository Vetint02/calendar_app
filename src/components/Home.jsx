import { useState } from 'react'
import './css/home.css'

export default function Home() {

    let paddingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let td = new Date();
    let month = td.getMonth();
    let year = td.getFullYear();

    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let startingDay = new Date(year, month, 1).getDay()

    const startingArray = Array.from({ length: startingDay }, (_, i) => i + 1)
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    return (
        <div className="calendar">
            <h1 style={{ textAlign: 'center', margin: '20px' }}>Calendar App</h1>
            <div className="calendar_headers">
                {
                    paddingDays.map((day, index) => {
                        return (
                            <div key={index} className="head">{day}</div>
                        )
                    })
                }
            </div>
            <div className="calendar_contents">
                {
                    startingArray.map((day, index) => {
                        return (
                            <div key={index} className="padding_box"/>
                        )
                    })
                }
                {
                    daysArray.map((day, index) => {
                        return (
                            <div key={index} className="calendar_box"></div>
                        )
                    })
                }
            </div>
        </div>
    )
}