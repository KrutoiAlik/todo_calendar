import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './Day.css';
import Task from "../components/Task";
import RequestService from "../services/RequestService";
import TaskModal from "../components/TaskModal";

export default function Day() {

    const [tasks, setTasks] = useState([]);

    const [isModalVisible, showModal] = useState(false);
    const [modalHeader, setModalHeader] = useState('');
    const [modalView, setModalView] = useState('');
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    const {date} = useParams();
    const dateObj = new Date(+date);
    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    const fetchTasks = async () => {

        const utcDate = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));

        const response = await new RequestService().doGet({
            url: `http://localhost:5000/task?task_date=${utcDate.toISOString().substring(0, 10)}`
        });

        setTasks(response);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {

    }, [selectedTasks]);

    const getTaskElements = () => {

        if (!tasks.length) {
            return (<span className='no_tasks__message'>No tasks have been assigned for this day</span>);
        }

        return tasks.map((task, index) => (
            <Task key={index}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  date={task.task_date}
                  handleCheck={(id, isSelected) => {

                      if (!isSelected && selectedTasks.has(id)) {
                          setSelectedTasks(prev => {
                              prev.delete(id);
                              return new Set([...Array.from(prev.values())])
                          });
                      }

                      if (isSelected && !selectedTasks.has(id)) {
                          setSelectedTasks(prev => new Set([...Array.from(prev.values()), id]));
                      }
                  }}
            />
        ));
    }

    const addTask = () => {
        setModalHeader('Add Task');
        setModalView('add');
        showModal(true);
    }

    const editTask = () => {
        setModalHeader('Edit Task');
        setModalView('edit');
        showModal(true);
    }

    const deleteTask = () => {
        setModalHeader(`Delete Task${selectedTasks.size > 1 ? 's' : ''}`);
        setModalView('delete');
        showModal(true);
    }

    const completeTask = () => {
        setModalHeader(`Complete Task${selectedTasks.size > 1 ? 's' : ''}`);
        setModalView('complete');
        showModal(true);
    }

    const selectedTaskObjects = () => {
        return tasks.filter(task => selectedTasks.has(task.id));
    }

    return (
        <div className='day'>
            <div className='day__body'>
                <div className='day__sidebar'>
                    <h3>Date</h3>
                    <span className='day__date'>{dateObj.toLocaleDateString("en-US", dateOptions)}</span>
                </div>
                <div className='day__data'>
                    <div className='actions'>
                        <button className='btn btn-add' onClick={addTask}>➕ Add</button>

                        <button className='btn btn-edit'
                                onClick={editTask}
                                disabled={!tasks.length || selectedTasks.size !== 1}>✎ Edit
                        </button>

                        <button className='btn btn-delete'
                                onClick={deleteTask}
                                disabled={!tasks.length || !selectedTasks.size}>🗑 Delete
                        </button>

                        <button className='btn btn-complete'
                                onClick={completeTask}
                                disabled={!tasks.length || !selectedTasks.size}>✔ Complete
                        </button>

                    </div>
                    <div className='day__tasks'>
                        {getTaskElements()}
                    </div>
                </div>
            </div>
            {isModalVisible && <TaskModal hideModal={() => showModal(false)}
                                          header={modalHeader}
                                          view={modalView}
                                          date={dateObj}
                                          task={modalView !== 'add' ? selectedTaskObjects()[0] : {}}
                                          tasks={selectedTaskObjects()}
            />}
        </div>
    );

}