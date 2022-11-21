import React from 'react';

export default function Task({ title, description, date }) {

    return (
        <div className='task'>
            <h3 className='task__title'>{title}</h3>
            <p>Description: {description}</p>
            <p>Date: {date}</p>
        </div>
    );
}