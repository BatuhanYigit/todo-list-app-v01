import { useEffect, useState } from 'react'
import './App.css'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'
import LoginSignup from './components/LoginPage/LoginSignup'
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([])




  useEffect(() => {

    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-all");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks: ", error.message);
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);


      }
    };

    fetchTasks();

  }, [])

  return (

    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/dashboard' element={
          <DndProvider backend={HTML5Backend}>
            <Toaster />
            <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16 pt-32">

              <CreateTask tasks={tasks} setTasks={setTasks} />
              <ListTasks tasks={tasks} setTasks={setTasks} />
            </div>
          </DndProvider>

        } />
      </Routes>

    </Router >

  )
}

export default App
