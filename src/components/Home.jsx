import { useState, useEffect, useContext } from 'react'
import ModalContext from '../contexts/ModalContext.jsx'
import './css/home.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

    const paddingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mockData = {
        data_1: {
            date: {
                year: 2026,
                month: 3,
                day: 24
            },
            notice: "this is a test string to see (24)"
        },
        data_2: {
            date: {
                year: 2026,
                month: 3,
                day: 26
            },
            notice: "this is a test string to see (26)"
        }
    }

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
    const [isLoading, setLoading] = useState(true);
    const [paddingArray, setPaddingArray] = useState([]);
    const [daysArray, setDaysArray] = useState([]);

    const { modalOpen, setModalOpen, setModalData } = useContext(ModalContext)

    useEffect(() => {
        let daysInMonth = new Date(currentYear, currentMonth[1] + 1, 0).getDate();
        let startingDay = new Date(currentYear, currentMonth[1], 1).getDay();
        setPaddingArray(Array.from({ length: startingDay }, (_, i) => i + 1));
        setDaysArray(Array.from({ length: daysInMonth }, (_, i) => i + 1));
        setLoading(false)
    }, [currentMonth, currentYear])

    function monthBack() {
        setLoading(true)
        let newDate = new Date(currentYear, currentMonth[1] - 1);
        let newMonth = newDate.getMonth();
        let newMonthLong = newDate.toLocaleDateString('en-us', { month: "long" });
        setCurrentMonth([newMonthLong, newMonth]);
        setCurrentYear(newDate.getFullYear());
    }

    function monthForward() {
        setLoading(true)
        let newDate = new Date(currentYear, currentMonth[1] + 1);
        let newMonth = newDate.getMonth();
        let newMonthLong = newDate.toLocaleDateString('en-us', { month: "long" });
        setCurrentMonth([newMonthLong, newMonth]);
        setCurrentYear(newDate.getFullYear());
    }

    function modalOverlay(year, month, day) {
        const dataArray = Object.values(mockData);
        let filteredData = dataArray.filter((item) =>
            item.date.year === year &&
            item.date.month === month &&
            item.date.day === day
        );
        console.log(filteredData)
        setModalData(filteredData[0].notice)
        setModalOpen(true)
    }

    if (isLoading) return (
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
                        <Button onClick={monthBack}><ArrowBackIcon /></Button>
                        <Button onClick={monthForward}><ArrowForwardIcon /></Button>
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
                    paddingArray.map((_, index) => {
                        return (
                            <div key={`pad-${index}`} className="padding_box" />
                        )
                    })
                }
                {
                    daysArray.map((day) => {
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