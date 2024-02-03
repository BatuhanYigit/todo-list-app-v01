import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'

function App() {
  const [tasks, setTasks] = useState([])

  return (
    <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16">
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks />
    </div>
  )
}

export default App
