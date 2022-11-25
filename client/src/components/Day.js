import React, {useState} from 'react';
import './Day.css';
import {useNavigate} from "react-router-dom";
import Modal from "./Modal";

export default function Day(props) {

    const [isModalVisible, showModal] = useState(false);

    const MAX_LIMIT_NUMBER_MINI_TASKS = 2;

    const miniTasksSize = MAX_LIMIT_NUMBER_MINI_TASKS > props.tasks.length
        ? props.tasks.length
        : MAX_LIMIT_NUMBER_MINI_TASKS;

    const classes = ['day__card'];

    if (!props.day) {
        classes.push('day__card-inactive');
    } else if (props.isHoliday) {
        classes.push('day__card-holiday');
    }

    const content = !!props.day ? props.day?.getDate() : '';

    const getTaskElements = () => {
        const miniTasks = [];

        for (let i = 0; i < miniTasksSize; i++) {
            miniTasks.push(<div key={i} className='task'>{props.tasks[i].title}</div>);
        }

        return miniTasks;
    }

    const navigate = useNavigate();

    const addTask = (e) => {
        e.stopPropagation();
        showModal(true);
    }

    const hideModal = (e) => {
        e.stopPropagation();
        showModal(false);
    }

    return (
        <div className={classes.join(' ')} onClick={() => navigate('/day/' + props.day?.getTime())}>
            <div className='day__title'>{content}</div>
            {!!props.day &&
                <div className="tasks">
                    {getTaskElements()}
                    {props.tasks.length > MAX_LIMIT_NUMBER_MINI_TASKS &&
                        <div className="show__all">
                            {props.tasks.length - MAX_LIMIT_NUMBER_MINI_TASKS} more...
                        </div>
                    }
                    <button className='btn' onClick={addTask}>➕ Add Task</button>
                </div>
            }
            {isModalVisible &&
                <Modal close={hideModal} header={'Add Task'} body={
                    <form className='task__modal'>
                        <input type='text' placeholder='Title'/>
                        <input type='text' placeholder='Description'/>
                        <input type='date' placeholder='Date' value={props.day}/>
                    </form>
                }/>
            }
        </div>
    );
}