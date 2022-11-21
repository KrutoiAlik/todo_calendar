import React, { useEffect, useState } from 'react';
import './Calendar.css';
import Task from './Task';

export default function Calendar() {

    console.log('Here');

    const [tasks, setTasks] = useState([]);

    const fetchAllTasks = async () => {

        const res = await fetch('http://localhost:5000/tasks');
        const tasks = await res.json();

        setTasks(tasks);
    }

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const getTaskElements = () => {
        return tasks.map(task => <Task key={task.id} title={task.title} description={task.description} date={task.date} />)
    }

    return (
        <div className='calendar'>
            <h1 className="calendar__title">TO-DO Calendar</h1>
            {
                tasks.length
                    ? <div className='tasks'>{getTaskElements()}</div>
                    : <p>No data retrieved</p>
            }
        </div>
    );
}