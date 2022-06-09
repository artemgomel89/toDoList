import React, { useState } from 'react';

import { CONSTANTS } from '../constants';

import db from '../Api/firebase';
import { collection, addDoc } from 'firebase/firestore';

const TaskAddingForm = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== '') {
            await addDoc(collection(db, CONSTANTS.TASKS), {
                title,
                completed: false,
                tag: null,
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

export default TaskAddingForm;
