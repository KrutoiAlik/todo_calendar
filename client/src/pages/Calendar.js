import React, {useEffect, useState} from 'react';
import './Calendar.css';
import RequestService from "../services/RequestService";
import CalendarContent from "../components/CalendarContent";

const server_url = 'http://localhost:5000';

export default function Calendar() {

    const [tasks, setTasks] = useState([]);
    const [days, setDays] = useState([]);
    const [currentDay] = useState(new Date().getDay());
    const [currentMonth, setMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setYear] = useState(new Date().getFullYear());

    const fetchAllTasks = async () => {
        const response = await new RequestService().doGet({
            url: `${server_url}/task`,
            userId: '1'
        });
        setTasks(response);
    }

    const fetchDays = async () => {

        const response = await new RequestService().doGet({
            url: `https://isdayoff.ru/api/getdata?year=${currentYear}&month=${currentMonth}`
        });

        const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
        const days = [];
        if (firstDayOfMonth.getDay() > 1) {
            for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
                days.push({});
            }
        }

        for (let i = 0; i < response.length; i++) {
            const dt = new Date(firstDayOfMonth);
            dt.setDate(firstDayOfMonth.getDate() + i);
            days.push({
                date: dt,
                isHoliday: !!+response[i] && dt.getDay() < 6 && dt.getDay() > 0 // do not show weekends (6 - saturday, 0 - sunday)
            });
        }

        setDays(days);
    }

    // TODO: deal with fetch 2 times
    useEffect(() => {
        const loadData = async() => {
            await fetchDays();
            await fetchAllTasks();
        }
        loadData();
    }, [currentMonth, currentYear]);

    const changeMonth = (e, monthNumber) => {
        e.preventDefault();
        setMonth(monthNumber + 1);
    }

    return (
        <div className='calendar'>
            <CalendarContent days={days}
                             tasks={tasks}
                             currentDay={currentDay}
                             currentMonth={currentMonth}
                             currentYear={currentYear}
                             setYear={setYear} changeMonth={changeMonth}/>
        </div>
    );
}