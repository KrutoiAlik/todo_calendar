import React from 'react';
import Modal from "./Modal";

export default function TaskModal(props) {

    const getBody = () => {

        switch (props.view) {
            case 'add':
                return (
                    <form className='task__modal'>
                        <input type='text' placeholder='Title'/>
                        <input type='text' placeholder='Description'/>
                        <input type='date' placeholder='Date'/>
                    </form>
                )
            case 'edit':
                return (
                    <form className='task__modal'>
                        <input type='text' placeholder='Title' value={props.task.title}/>
                        <input type='text' placeholder='Description' value={props.task.description}/>
                        <input type='date' placeholder='Date' value={props.task.task_date.toISOString().substring(0, 10)}/>
                    </form>
                )
            case 'delete':
                return (
                    <div>Delete?</div>
                )
            case 'complete':
                return (
                    <div>Complete?</div>
                )
        }

        return {};
    }

    return (
        <Modal close={props.hideModal} header={props.header} body={getBody()}/>
    )
}