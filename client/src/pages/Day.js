import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import './Day.css';
import Task from "../components/Task";
import RequestService from "../services/RequestService";
import TaskModal from "../components/TaskModal";
import Spinner from "../components/Spinner";

export default function Day() {

    const tasks = useRef([]);
    const modalHeader = useRef('');
    const modalView = useRef('');

    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [isModalVisible, showModal] = useState(false);
    const [isLoading, setLoading] = useState(true);

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

        tasks.current = response || [];
        setLoading(false);
    }

    useEffect(() => {
        if (isLoading) {
            fetchTasks();
        }
    }, [isLoading]);

    const getTaskElements = () => {

        if (!tasks.current.length) {
            return (<span className='no_tasks__message'>No tasks have been assigned for this day</span>);
        }

        return tasks.current.map((task, index) => (
            <Task key={index}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  date={task.task_date}
                  status={task.status}
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
        modalHeader.current = 'Add Task';
        modalView.current = 'add';
        showModal(true);
    }

    const editTask = () => {
        modalHeader.current = 'Edit Task';
        modalView.current = 'edit';
        showModal(true);
    }

    const deleteTask = () => {
        modalHeader.current = `Delete Task${selectedTasks.size > 1 ? 's' : ''}`;
        modalView.current = 'delete';
        showModal(true);
    }

    const completeTask = () => {
        modalHeader.current = `Complete Task${selectedTasks.size > 1 ? 's' : ''}`;
        modalView.current = 'complete';
        showModal(true);
    }

    const selectedTaskObjects = () => {

        if (tasks.current.length) {
            return tasks.current.filter(task => selectedTasks.has(task.id));
        }

        return [];
    }

    const hideModal = () => {
        setSelectedTasks(new Set());
        showModal(false);
        setLoading(true);
    }

    return (
        <div className='day'>

            <Spinner show={isLoading}/>

            {!isLoading &&

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
                                    disabled={!tasks.current.length || selectedTasks.size !== 1}>✎ Edit
                            </button>

                            <button className='btn btn-delete'
                                    onClick={deleteTask}
                                    disabled={!tasks.current.length || !selectedTasks.size}>🗑 Delete
                            </button>

                            <button className='btn btn-complete'
                                    onClick={completeTask}
                                    disabled={!tasks.current.length || !selectedTasks.size}>✔ Complete
                            </button>

                        </div>
                        <div className='day__tasks'>
                            {getTaskElements()}
                        </div>
                    </div>
                </div>
            }
            {isModalVisible && <TaskModal hideModal={hideModal}
                                          header={modalHeader.current}
                                          view={modalView.current}
                                          date={dateObj}
                                          task={modalView.current !== 'add' ? selectedTaskObjects()[0] : undefined}
                                          tasks={selectedTaskObjects()}
            />
            }

        </div>
    );

}