import { useState, useEffect, useContext } from 'react'
import ModalContext from '../contexts/ModalContext.jsx'
import './css/home.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const paddingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mockData = [
    {
        date: {
            year: 2026,
            month: ["March", 3],
            day: 24
        },
        notice: ["This is a test string to see (24)", "Second test string to see (24)"]
    },
    {
        date: {
            year: 2026,
            month: ["March", 3],
            day: 26
        },
        notice: ["This is a test string to see (26)"]
    }
]

export default function Home() {

    let td = new Date();
    const todayDate = td.getDate();
    const todayMonth = td.getMonth();
    const todayYear = td.getFullYear();

    const [currentMonth, setCurrentMonth] = useState([
        td.toLocaleDateString('en-us', { month: "long" }),
        td.getMonth()
    ]);
    const [currentYear, setCurrentYear] = useState(
        td.getFullYear()
    );
    const [calendarData, setCalendarData] = useState({
        padding: [],
        days: [],
        loading: true
    });

    const { modalOpen, setModalOpen, setModalData } = useContext(ModalContext)

    useEffect(() => {
        let daysInMonth = new Date(currentYear, currentMonth[1] + 1, 0).getDate();
        let startingDay = new Date(currentYear, currentMonth[1], 1).getDay();
        setCalendarData({
            padding: Array.from({ length: startingDay }, (_, i) => i + 1),
            days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            loading: false
        });
    }, [currentMonth, currentYear])

    function monthChange(number) {
        setCalendarData({...calendarData, loading: true})
        let newDate = new Date(currentYear, currentMonth[1] + number);
        let newMonth = newDate.getMonth();
        let newMonthLong = newDate.toLocaleDateString('en-us', { month: "long" });
        setCurrentMonth([newMonthLong, newMonth]);
        setCurrentYear(newDate.getFullYear());
    }

    function modalOverlay(year, month, day) {
        let filteredData = mockData.filter((item) =>
            item.date.year === year &&
            item.date.month[1] === month &&
            item.date.day === day
        );
        if (filteredData[0] === undefined) {
            setModalData([{ date: { day, month: currentMonth, year }, notice: "" }]);
        }
        else {
            setModalData(filteredData)
        }
        setModalOpen(true)
    }

    if (calendarData.Loading) return (
        <Box className="loading">
            <CircularProgress />
        </Box>
    )

    return (
        <div className="calendar">
            <h1 style={{ textAlign: 'center', margin: '20px' }}>Calendar App</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ textAlign: 'center', margin: '20px' }}>{currentMonth[0]}, {currentYear}</h2>
                <Box sx={{ margin: '14px' }}>
                    <ButtonGroup variant="text" aria-label="Basic button group">
                        <Button onClick={() => monthChange(-1)}><ArrowBackIcon /></Button>
                        <Button onClick={() => monthChange(1)}><ArrowForwardIcon /></Button>
                    </ButtonGroup>
                </Box>
            </div>
            <div className="calendar_headers">
                {
                    paddingDays.map((day) => {
                        return (
                            <div key={day} className="head">{day}</div>
                        )
                    })
                }
            </div>
            <div className="calendar_contents">
                {
                    calendarData.padding.map((index) => {
                        return (
                            <div key={`pad-${index}`} className="padding_box" />
                        )
                    })
                }
                {
                    calendarData.days.map((day) => {
                        const isToday = day === todayDate && currentMonth[1] === todayMonth && currentYear === todayYear;
                        return (
                            <div key={day} onClick={() => modalOverlay(currentYear, currentMonth[1], day)} className={isToday ? "calendar_box_current" : "calendar_box"}>
                                <div className="calendar_text">{day}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}