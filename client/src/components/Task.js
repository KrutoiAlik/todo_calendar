import React from 'react';
import './Task.css';
import {useNavigate} from "react-router-dom";

export default function Task({id, title, description, date}) {

    const navigate = useNavigate();

    const toTaskDetailPage = () => {
        navigate(`/task/${id}`);
    }

    return (
        <div className='task'>
            <h3 className='task__title'>
                <input type='checkbox'/>
                <span onClick={toTaskDetailPage}>
                    {title}
                </span>
            </h3>
            <p>Description: {description}</p>
            <p>Date: {date}</p>
        </div>
    );
}