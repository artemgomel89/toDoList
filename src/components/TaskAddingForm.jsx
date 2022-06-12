import React, { useState } from 'react';

import { CONSTANTS } from '../constants';

import db from '../Api/firebase';
import { collection, addDoc } from 'firebase/firestore';

const TaskAddingForm = ({ tags }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== '') {
            if (title.indexOf('#') !== -1) {
                const wordsArr = [];
                const tagsArr = [];

                title
                    .split(' ')
                    .forEach((word) =>
                        word.startsWith('#')
                            ? tagsArr.push(word.slice(1))
                            : wordsArr.push(word)
                    );

                addDoc(collection(db, CONSTANTS.TASKS), {
                    title: wordsArr.join(' '),
                    completed: false,
                    tag: tagsArr[0],
                });

                tagsArr.forEach((el, i) => {
                    if (tags[i].name !== el) {
                        addDoc(collection(db, CONSTANTS.TAGS), { name: el });
                    }
                });
            } else {
                addDoc(collection(db, CONSTANTS.TASKS), {
                    title,
                    completed: false,
                    tag: null,
                });
            }
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
