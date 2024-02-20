import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import CardTest from "../components/CardTest/CardTest"

const apiUrl = import.meta.env.VITE_API_URL;



const ListTasks = ({ tasks, setTasks }) => {
    const localToken = localStorage.getItem('token')
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/get-all`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                throw new Error('Failed to fetch data');


            }
        };

        fetchData();
    }, [localToken]);



    useEffect(() => {


        if (Array.isArray(tasks.data)) {
            const fTodos = tasks.data.filter((task) => task.status === "todo");
            const fInProgress = tasks.data.filter((task) => task.status === "inprogress");
            const fClosed = tasks.data.filter((task) => task.status === "closed");

            setTodos(fTodos);
            setInProgress(fInProgress);
            setClosed(fClosed);
        } else {

            console.log()

        }


    }, [tasks.data]);

    const statuses = ["todo", "inprogress", "closed"]
    return (<div className="flex gap-16">
        {statuses.map((status, index) => <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            closed={closed} />)}
    </div>);
}

export default ListTasks;



const Section = ({ status, tasks, setTasks, todos, inProgress, closed, }) => {


    const [{ isOver }, drop] = useDrop(() => ({

        accept: "task",
        drop: (item) => addItemToSection(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo";
    let bg = "bg-slate-500";
    let tasksToMap = todos

    if (status === "inprogress") {
        text = "In progress"
        bg = "bg-purple-500"
        tasksToMap = inProgress
    }

    if (status === "closed") {
        text = "Closed"
        bg = "bg-green-500"
        tasksToMap = closed
    }
    const updateTaskStatus = async (taskId, newStatus) => {
        const localToken = localStorage.getItem('token')
        try {
            const response = await fetch(`${apiUrl}/update-status/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localToken}`
                },
                body: JSON.stringify({ id: taskId, newStatus: newStatus })
            });
            if (!response.ok) {
                throw new Error("Failed to update task status");
            }
            const updatedTask = await response.json();
            return updatedTask;
        } catch (error) {
            console.error("Error updating task status:", error.message);
            toast.error("Failed to update task status");
            throw error;
        }
    };

    const addItemToSection = async (id, newStatus) => {
        const localToken = localStorage.getItem('token')
        try {
            await updateTaskStatus(id, newStatus);
            toast.success(`Task status ${newStatus}`);
            const fetchTasksResponse = await fetch(`${apiUrl}/get-all`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localToken}`
                }
            });
            if (!fetchTasksResponse.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const updatedTasks = await fetchTasksResponse.json();


            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error updating task status:", error.message);
            toast.error("Failed to update task status");
        }
    };


    return (<div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}>
        <Header text={text} bg={bg} count={tasksToMap.length} />
        {tasksToMap.length > 0 && tasksToMap.map((task) => <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks} />)}
    </div>);
}

const Header = ({ text, bg, count }) => {
    return (<div className={`${bg} flex items-center h-12 pl-4 pr-4 rounded-md uppercase text-sm text-white justify-between`} >

        <div>{text}</div>
        <div className="nl-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
            {count}</div>
    </div>);
}

const Task = ({ task, tasks, setTasks }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task._id },

        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))




    const handleRemove = async (id) => {
        const localToken = localStorage.getItem('token')


        try {
            const response = await fetch(`${apiUrl}/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${localToken}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            const updatedTasks = tasks.data.filter((t) => t._id !== id);
            setTasks({ ...tasks, data: updatedTasks });

            toast.success(`${task.name} Removed`)

        } catch (error) {
            console.error("Error removing task:", error.message);
            toast.error("Failed to remove task");
        }





    }
    return (
        <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md ${isDragging ? "opacity-25" : "opacity-100"} cursor-grab`}>

            {/* <CardTest
                data={{
                    title: task.name,
                    description: "Tasks Detail",
                    completedTasks: 23,
                    totalTasks: 36,
                    avatars: [
                        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
                        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png',
                        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
                    ]
                }}
            /> */}

            <p>{task.name}</p>
            <button className="absolute bottom-1 right-1 text-slate-400" onClick={() => handleRemove(task._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </button>
        </div>
    );
}
