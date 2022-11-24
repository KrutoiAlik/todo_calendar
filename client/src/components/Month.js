import React from 'react';
import './Month.css';

export default function Month(props) {

    const classes = ['month'];

    if (props.isCurrent) {
        classes.push('selected');
    }

    return (
        <div className={classes.join(' ')}
             onClick={(e) => props.changeMonth(e, props.monthNumber)}>
            {props.month}
        </div>
    );
}