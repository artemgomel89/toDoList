import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import TaskForm from './components/TaskForm';

import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import db from './firebase';

import './App.scss';
import TaskItem from './components/TaskItem';
import Tags from './components/Tags';

function App() {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);

    const handleEdit = async (task, title) => {
        await updateDoc(doc(db, 'tasks', task.id), { title: title });
    };
    const toggleComplete = async (task) => {
        await updateDoc(doc(db, 'tasks', task.id), {
            completed: !task.completed,
        });
    };
    const handleDelete = async (id, path) => {
        await deleteDoc(doc(db, path, id));
    };

    useEffect(() => {
        const q = query(collection(db, 'tasks'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tasksArr = [];
            querySnapshot.forEach((doc) => {
                tasksArr.push({ ...doc.data(), id: doc.id });
            });
            setTasks(tasksArr);
        });

        return () => unsub();
    }, []);

    return (
        <div className="App">
            <Header />
            <Tags handleDelete={handleDelete} tags={tags} setTags={setTags} />
            <TaskForm />
            <div className="todo_list">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleComplete={toggleComplete}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        tags={tags}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
