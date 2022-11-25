import React from 'react';
import './Modal.css';

export default function Modal(props) {

    return (
        <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal__content'>

                <div className="modal__header">
                    <h3 className='header__title'>{props.header}</h3>
                </div>
                <div className="modal__body">
                    {props.body}
                </div>
                <div className="modal__footer">
                    <button className='btn' value="Close" onClick={props.close}>Close</button>
                    <button className='btn btn-submit' value="Submit" onClick={props.close}>Submit</button>
                </div>
            </div>

        </div>
    );
}