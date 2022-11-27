import React from 'react';
import './Spinner.css';

export default function Spinner(props) {

    const classes = ["loading"];

    if (props.show) {
        classes.push("spinner__show");
    }

    return <div className={classes.join(' ')}></div>
}