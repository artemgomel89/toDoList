import React from 'react';
import Header from './components/Header';
import './App.scss';
import TaskForm from './components/TaskForm';

function App() {
    return (
        <div className="App">
            <Header />
            <TaskForm />
        </div>
    );
}

export default App;
