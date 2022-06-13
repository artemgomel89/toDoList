import React, { useEffect, useState } from 'react';

import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import db from './Api/firebase';

import Header from './components/Header';
import TaskAddingForm from './components/TaskAddingForm';
import TaskItem from './components/TaskItem';
import Tags from './components/Tags';

import './App.scss';
import { CONSTANTS } from './constants';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function App() {
    const [tasks, setTasks] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [tags, setTags] = useState([]);

    const handleEdit = async (task, title) => {
        await updateDoc(doc(db, CONSTANTS.TASKS, task.id), { title });
    };
    const toggleComplete = async (task) => {
        await updateDoc(doc(db, CONSTANTS.TASKS, task.id), {
            completed: !task.completed,
        });
    };
    const handleDelete = async (id, path) => {
        await deleteDoc(doc(db, path, id));
    };

    const getTasks = async () => {
        const q = query(collection(db, CONSTANTS.TASKS));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let tasksArr = [];
            querySnapshot.forEach((doc) => {
                tasksArr.push({ ...doc.data(), id: doc.id });
            });

            isFiltered
                ? setTasks(
                      tasksArr.sort((a, b) => {
                          let nameA = a.tag ? a.tag.toLowerCase() : '',
                              nameB = b.tag ? b.tag.toLowerCase() : '';

                          if (nameA < nameB) return -1;
                          if (nameA > nameB) return 1;
                          return 0;
                      })
                  )
                : setTasks(tasksArr);

            console.log(tasks);
        });
        return () => unsub();
    };

    useEffect(() => {
        getTasks();
    }, [isFiltered]);

    return (
        <div className="App">
            <Header />
            <Tags handleDelete={handleDelete} tags={tags} setTags={setTags} />
            <TaskAddingForm tags={tags} />
            <button
                className={`button-edit button__filter ${
                    isFiltered ? 'filter-active' : ''
                }`}
                onClick={() => {
                    console.log('Clicked!');
                    setIsFiltered(!isFiltered);
                }}
            >
                <FilterAltIcon id="i" />
            </button>
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
