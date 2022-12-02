import React from 'react';
import './Task.css';
import {useNavigate} from "react-router-dom";

export default function Task(props) {

    const navigate = useNavigate();

    const toTaskDetailPage = () => {
        navigate(`/task/${props.id}`);
    }

    return (
        <div className={`task ${props.status === 'complete' ? 'task-completed' : ''}`}>
            <h3 className={`task__title`}>
                <input type='checkbox' onChange={(e) => props.handleCheck(props.id, e.target.checked)}/>
                <span onClick={toTaskDetailPage}>
                    {props.title}
                </span>
            </h3>
            <p>Description: {props.description}</p>
            <p>Date: {props.date}</p>
        </div>
    );
}