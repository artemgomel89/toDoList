import React, { useState } from 'react';

import { PATH } from '../constants';

import db from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const TaskForm = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== '') {
            await addDoc(collection(db, PATH.TASKS), {
                title,
                completed: false,
            });
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input_container">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="btn_container">
                <button>Add</button>
            </div>
        </form>
    );
};

export default TaskForm;
