import React, {useEffect, useState} from 'react';
import RequestService from "../services/RequestService";
import {useParams} from "react-router-dom";

export default function Task() {

    const [task, setTask] = useState({});

    const {id} = useParams();

    const fetchTask = async () => {
        const response = await new RequestService().doGet({
            url: `http://localhost:5000/task/${id}`,
            userId: '1'
        });
        setTask(response);
    }

    useEffect(() => {
        fetchTask();
    }, [])

    return (
        <div>{task.title}</div>
    );
}