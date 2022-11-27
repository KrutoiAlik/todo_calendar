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
                   isCurrent={props.date?.month - 1 === index}
                   changeMonth={(month) => {
                       props.setDate(prev => {
                           return {...prev, month: month + 1}
                       });
                   }}/>
        ));
    }

    const setYear = (year) => {
        props.setDate(prev => {
            return {...prev, year}
        });
    }

    return (
        <div className='calendar__data'>
            <h3 className="calendar__title">{props.date?.year}</h3>

            <div className="months">
                <button className='btn btn__left'
                        onClick={(e) => setYear(props.date.year - 1)}>⯇
                </button>
                {calendarMonthHeaders()}
                <button className='btn btn__right'
                        onClick={(e) => setYear(props.date.year + 1)}>⯈
                </button>
            </div>
            <div className="border__line"></div>
            <div className='day__headers'>{calendarDayHeaders()}</div>
            <div className="days">{getDayElements()}</div>
        </div>
    );
}