import React, { useState } from 'react';

import { PATH } from '../constants';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAutocomplete from './MuiAutocomplete';

const TaskItem = ({ task, toggleComplete, handleDelete, handleEdit, tags }) => {
    const [newTitle, setNewTitle] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (task.complete) {
            setNewTitle(task.title);
        } else {
            task.title = '';
            setNewTitle(e.target.value);
        }
    };

    return (
        <div className="todo">
            <input
                style={{ textDecoration: task.completed && 'line-through' }}
                type="text"
                value={task.title === '' ? newTitle : task.title}
                className="list"
                onChange={handleChange}
            />
            <div>
                <button
                    className="button-complete"
                    onClick={() => toggleComplete(task)}
                >
                    <CheckCircleIcon id="i" />
                </button>
                <button
                    className="button-edit"
                    onClick={() => handleEdit(task, newTitle)}
                >
                    <EditIcon id="i" />
                </button>
                <button
                    className="button-delete"
                    onClick={() => handleDelete(task.id, PATH.TASKS)}
                >
                    <DeleteIcon id="i" />
                </button>
            </div>
            <MuiAutocomplete tags={tags} />
        </div>
    );
};

export default TaskItem;
