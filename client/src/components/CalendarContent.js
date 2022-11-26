import React from 'react';
import Day from "./Day";
import Month from "./Month";
import './CalendarContent.css';

export default function CalendarContent(props) {

    const getDayElements = () => {
        return props.days.map((day, index) => <Day key={'day' + index}
                                                   day={day.date}
                                                   tasks={day.tasks || []}
                                                   isHoliday={day.isHoliday}/>);
    }

    const calendarDayHeaders = () => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return weekdays.map((day, index) => (
            <div key={'weekday' + index} className='day__header'>{day}</div>
        ));
    }

    const calendarMonthHeaders = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months.map((month, index) => (
            <Month key={'month' + index}
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
                        onClick={(e) => props.setYear(prev => prev + 1)}>⯈
                </button>
            </div>
            <div className="border__line"></div>
            <div className='day__headers'>{calendarDayHeaders()}</div>
            <div className="days">{getDayElements()}</div>
        </div>
    );
}