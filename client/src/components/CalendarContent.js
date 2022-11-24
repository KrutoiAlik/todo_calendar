import React, {useState} from 'react';
import Day from "./Day";
import Task from "./Task";
import Month from "./Month";

export default function CalendarContent(props) {

    const getDayElements = () => {

        // hardcoded data -> replace in future
        const tasks = [{
            title: 'Task 1'
        },{
            title: 'Task 2'
        },{
            title: 'Task 3'
        },{
            title: 'Task 4'
        }];

        return props.days.map((day) => <Day day={day.date}
                                            tasks={tasks}
                                            isHoliday={day.isHoliday}/>);
    }

    // TODO: Decide how to display tasks within the day card (2 or 3 mini task cards with view more or something like this)
    const getTaskElements = () => {
        return props.tasks.map(task => <Task key={task.id}
                                       title={task.title}
                                       description={task.description}
                                       date={task.date}/>)
    }

    const calendarDayHeaders = () => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return weekdays.map(day => <div className='day__header'>{day}</div>)
    }

    const calendarMonthHeaders = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months.map((month, index) => (
            <Month key={index}
                   monthNumber={index}
                   month={month}
                   isCurrent={props.currentMonth - 1 === index}
                   changeMonth={props.changeMonth}/>
        ));
    }

    return (
        <div className='calendar__data'>
            <h3 className="calendar__title">{props.currentYear}</h3>

            <div className="months">
                <button className='btn btn__left' onClick={(e) => props.setYear(prev => prev - 1)}>⯇</button>
                {calendarMonthHeaders()}
                <button className='btn btn__right'
                        disabled={props.currentYear === new Date().getFullYear()}
                        onClick={(e) => props.setYear(prev => prev + 1)}>⯈
                </button>
            </div>
            <div className="border__line"></div>
            <div className='day__headers'>{calendarDayHeaders()}</div>
            <div className="days">{getDayElements()}</div>
        </div>
    );
}