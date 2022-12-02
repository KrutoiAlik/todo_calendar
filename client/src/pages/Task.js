import React, {useEffect, useState} from 'react';
import RequestService from "../services/RequestService";
import {useParams} from "react-router-dom";
import './Task.css';

export default function Task() {

    const [task, setTask] = useState({});

    const {id} = useParams();

    const fetchTask = async () => {
        const response = await new RequestService().doGet({
            url: `http://localhost:5000/task/${id}`,
            userId: '1'
        });

        setTask(response && response.length !== 0 ? response[0] : undefined);
    }

    useEffect(() => {
        fetchTask();
    }, [])

    const getStatusForLayout = () => {

        if (!task.status) {
            return '';
        }

        const statusCharacters = task.status.split('');
        statusCharacters[0] = statusCharacters[0].toUpperCase();

        return statusCharacters.join('');
    }

    return (
        <div className='task'>
            <div className='task__header'>
                <h3>{task.title}</h3>
            </div>

            <div className='task__fields'>
                <form>
                    <fieldset disabled>
                        <div className='field-group'>
                            <label htmlFor='taskTitle'>Title</label>
                            <span id='taskTitle' className="task__field">{task.title}</span>
                        </div>
                        <div className='field-group'>
                            {/*text area?*/}
                            <label htmlFor='taskDescription'>Description</label>
                            <span id='taskDescription' className="task__field">{task.description}</span>
                        </div>
                        <div className='field-group'>
                            <label htmlFor='taskStatus'>Status</label>
                            <span id='taskStatus' className="task__field">{getStatusForLayout()}</span>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div className='task__attachments'>
                <fieldset>
                    <label htmlFor="taskAttachments">Attachments</label>
                    <input id="taskAttachments" type='file'/>
                </fieldset>
            </div>
        </div>
    );
}