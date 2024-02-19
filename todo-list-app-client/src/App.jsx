import { useEffect, useState } from 'react'
import './App.css'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'
import LoginSignup from './components/LoginPage/LoginSignup'
import UserMenu from './components/UserMenu/UserMenu'
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [tasks, setTasks] = useState([])

  const login = async () => {

  }




  useEffect(() => {

    const localToken = localStorage.getItem('token')
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/get-all", {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${localToken}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");

        }
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
        <Route path='/dashboard' element={login ?
          <DndProvider backend={HTML5Backend}>
            <Toaster />

            <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16 pt-32">

              <CreateTask tasks={tasks} setTasks={setTasks} />
              <div className='userMenu'><UserMenu></UserMenu></div>
              <ListTasks tasks={tasks} setTasks={setTasks} />

            </div>
          </DndProvider>
          : <LoginSignup />

        } />
      </Routes>

    </Router >

  )
}

export default App
