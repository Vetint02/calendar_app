import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ModalContext from '../contexts/ModalContext.jsx'
import FetchData from '../components/FetchData.jsx'
import './css/home.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const paddingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Home() {
    let td = new Date();
    const todayDate = td.getDate();
    const todayMonth = td.getMonth();
    const todayYear = td.getFullYear();
    const { state } = useLocation();

    const initMonth = state?.returnMonth ?? todayMonth;
    const initYear = state?.returnYear ?? todayYear;

    const [currentMonth, setCurrentMonth] = useState([
        new Date(initYear, initMonth).toLocaleDateString('en-us', { month: "long" }),
        initMonth
    ]);
    const [currentYear, setCurrentYear] = useState(initYear);
    const [calendarData, setCalendarData] = useState({
        padding: [],
        days: [],
        loading: true
    });
    const { modalOpen, setModalOpen, setModalData, noticeCounts, refreshCounts } = useContext(ModalContext);

    useEffect(() => {
        let daysInMonth = new Date(currentYear, currentMonth[1] + 1, 0).getDate();
        let startingDay = new Date(currentYear, currentMonth[1], 1).getDay();
        setCalendarData({
            padding: Array.from({ length: startingDay }, (_, i) => i + 1),
            days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            loading: false
        });
        refreshCounts(currentMonth[1], currentYear);
        console.log('noticeCounts after refresh:', noticeCounts); // check what counts look like
    }, [currentMonth, currentYear]);

    function monthChange(number) {
        setCalendarData({ ...calendarData, loading: true });
        let newDate = new Date(currentYear, currentMonth[1] + number);
        setCurrentMonth([newDate.toLocaleDateString('en-us', { month: "long" }), newDate.getMonth()]);
        setCurrentYear(newDate.getFullYear());
    }

    async function modalOverlay(day, month, year) {
        const response = await FetchData(day, month, year);
        console.log('raw response:', response); // check what the API returns
        let notices = response ? response.map(item => ({
            text: item.notice,
            id: item._id
        })) : [];
        setModalData({ day, month, year, notices });
        setModalOpen(true);
    }

    if (calendarData.loading) return (
        <Box className="loading">
            <CircularProgress />
        </Box>
    );

    return (
        <div>
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
                    {paddingDays.map((day) => (
                        <div key={day} className="head">{day}</div>
                    ))}
                </div>
                <div className="calendar_contents">
                    {calendarData.padding.map((index) => (
                        <div key={`pad-${index}`} className="padding_box" />
                    ))}
                    {calendarData.days.map((day) => {
                        const isToday = day === todayDate && currentMonth[1] === todayMonth && currentYear === todayYear;
                        const count = noticeCounts[day];
                        return (
                            <div
                                key={day}
                                onClick={() => modalOverlay(day, currentMonth[1], currentYear)}
                                className={isToday ? "calendar_box_current" : "calendar_box"}
                            >
                                <div className="calendar_text">{day}</div>
                                {count > 0 && (
                                    <div className="notice_badge">{count}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}