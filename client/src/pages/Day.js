import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './Day.css';
import Task from "../components/Task";

export default function Day() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks([{
            title: 'Task 1',
            description: 'Retrieve real data from the Database',
            task_date: '2022-05-11'
        }, {
            title: 'Task 1',
            description: 'Retrieve real data from the Database',
            task_date: '2022-05-11'
        }, {
            title: 'Task 1',
            description: 'Retrieve real data from the Database',
            task_date: '2022-05-11'
        }]);
    }, []);

    const {date} = useParams();
    const dateObj = new Date(+date);

    const getTaskElements = () => tasks.map((task, index) => (
        <Task key={index} title={task.title} description={task.description} date={task.task_date}/>
    ));

    return (
        <div className='day'>
            <div className='day__body'>
                <div className='day__sidebar'>
                    <h3>Date</h3>
                    <span className='day__date'>{dateObj.toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}</span>
                </div>
                <div className='day__data'>
                    <div className='actions'>
                        <button className='btn btn-add'>➕ Add</button>
                        <button className='btn btn-edit'>✎ Edit</button>
                        <button className='btn btn-delete'>🗑 Delete</button>
                        <button className='btn btn-complete'>✔ Complete</button>
                    </div>
                    <div className='day__tasks'>
                        {getTaskElements()}
                    </div>
                </div>
            </div>
        </div>
    );

}