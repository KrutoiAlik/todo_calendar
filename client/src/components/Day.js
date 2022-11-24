import React from 'react';
import './Day.css';

export default function Day(props) {

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
            miniTasks.push(<div className='task'>{props.tasks[i].title}</div>);
        }

        return miniTasks;
    }

    return (
        <div className={classes.join(' ')}>
            <div className='day__title'>{content}</div>
            {!!props.day &&
                <div className="tasks">
                    {getTaskElements()}
                    {props.tasks.length > MAX_LIMIT_NUMBER_MINI_TASKS &&
                        <div className="show__all">
                            {props.tasks.length - MAX_LIMIT_NUMBER_MINI_TASKS} more...
                        </div>
                    }
                </div>
            }
        </div>
    );
}