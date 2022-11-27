import React, {useState} from 'react';
import Modal from "./Modal";
import RequestService from "../services/RequestService";
import './TaskModal.css';

export default function TaskModal(props) {

    const utcDate = props.date
        ? new Date(Date.UTC(props.date.getFullYear(), props.date.getMonth(), props.date.getDate()))
        : {};

    const [task, setTask] = useState(props.task || {
        title: '',
        description: '',
        task_date: utcDate.toISOString().substring(0, 10)
    });

    const handleFieldChange = (e, field) => {
        setTask(prev => {
            const updates = {...prev};
            updates[field] = e.target.value;
            return updates;
        })
    }

    const handleSubmit = () => {

        const service = new RequestService();

        switch (props.view) {
            case 'add':
                service.doPost({
                    url: `http://localhost:5000/task?task_date=${utcDate.toISOString().substring(0, 10)}`,
                    body: task
                }).then((data) => console.log({data})).finally(() => props.hideModal());
                break;
            case 'edit':
                service.doPut({
                    url: `http://localhost:5000/task`,
                    body: task
                });
                break;
            case 'delete':
                service.doPut({
                    url: `http://localhost:5000/task`,
                    body: {
                        ids: props.tasks.map(task => task.id)
                    }
                });
                break;
            case 'complete':
                service.doDelete({
                    url: `http://localhost:5000/task`,
                    body: {
                        ids: props.tasks.map(task => task.id)
                    }
                });
                break;
        }
    }

    const getBody = () => {

        switch (props.view) {
            case 'add':
            case 'edit':
                return (
                    <form className='task__modal' onSubmit={handleSubmit}>
                        <input type='text'
                               placeholder='Title'
                               value={task?.title}
                               onChange={(e) => handleFieldChange(e, 'title')}/>
                        <input type='text'
                               placeholder='Description'
                               value={task?.description}
                               onChange={(e) => handleFieldChange(e, 'description')}/>
                        <input type='date'
                               onChange={(e) => handleFieldChange(e, 'task_date')}
                               disabled={props.view === 'edit'}
                               value={task?.task_date}/>
                    </form>
                )
            case 'delete':
            case 'complete':
                return (
                    <ul className='body__list'>
                        {props.tasks?.map((task, index) => <li>{index + 1}. {task.title}</li>)}
                    </ul>
                )
        }

        return {};
    }

    return (
        <Modal close={props.hideModal} header={props.header} body={getBody()} handleSubmit={handleSubmit}/>
    )
}