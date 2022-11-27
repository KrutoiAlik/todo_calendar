import React, {useEffect, useRef, useState} from 'react';
import './Calendar.css';
import RequestService from "../services/RequestService";
import CalendarContent from "../components/CalendarContent";
import Spinner from "../components/Spinner";

const server_url = 'http://localhost:5000';

export default function Calendar() {

    const tasksRef = useRef(new Map());
    const daysRef = useRef([]);

    const [isLoading, setLoading] = useState(true);
    const [currentDate, setDate] = useState({
        day: new Date().getUTCDate(),
        month: new Date().getUTCMonth() + 1,
        year: new Date().getUTCFullYear()
    });

    const fetchAllTasks = async () => {
        const dbTasks = await new RequestService().doGet({
            url: `${server_url}/task`,
            userId: '1'
        });

        const tasksByTime = new Map();
        for (const task of dbTasks) {
            const d = new Date(task.task_date);

            const utcTime = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

            if (!tasksByTime.has(utcTime)) {
                tasksByTime.set(utcTime, []);
            }

            tasksByTime.get(utcTime).push(task);
        }

        tasksRef.current = tasksByTime;
    }

    const createDays = async () => {

        let response;

        try {
            response = await new RequestService().doGet({
                url: `https://isdayoff.ru/api/getdata?year=${currentDate.year}&month=${currentDate.month}`
            });
        } catch (err) {
            console.error('IsDayOff is unavailable: ' + err.message);
        }

        const firstDayOfMonth = new Date(currentDate.year, currentDate.month - 1, 1);

        // if the first day of month is not the Sunday -> add empty daysRef
        const days = [];
        if (firstDayOfMonth.getDay() > 0) {
            for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
                days.push({});
            }
        }

        const daysInMonth = new Date(currentDate.year, currentDate.month, 0).getDate();

        for (let i = 0; i < daysInMonth; i++) {
            const dt = new Date(firstDayOfMonth);
            dt.setDate(firstDayOfMonth.getDate() + i);

            const utcTime = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate());
            const isWeekend = dt.getDay() < 6 && dt.getDay() > 0;
            const isHoliday = response && !!+response[i] && isWeekend;

            days.push({
                date: dt,
                isHoliday: isHoliday,
                tasks: tasksRef.current.get(utcTime) || []
            });
        }

        daysRef.current = days;
        console.log({days: daysRef.current})
    }

    // TODO: deal with fetch 2 times
    useEffect(() => {

        setLoading(true);

        const loadData = async () => {

            if (tasksRef.current.size === 0) {
                await fetchAllTasks();
            }

            await createDays();
        }

        loadData().then(() => setLoading(false));

    }, [currentDate]);

    return (
        <div className='calendar'>
            <Spinner show={isLoading}/>
            {!isLoading &&
                <CalendarContent days={daysRef.current}
                                 date={currentDate}
                                 setDate={setDate}/>
            }
        </div>
    );
}