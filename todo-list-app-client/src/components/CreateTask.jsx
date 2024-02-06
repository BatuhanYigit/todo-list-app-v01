import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo",
    });

    console.log(task)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (task.name.length < 3) {
            return toast.error("A Task must have more than 3 characters !")
        }

        if (task.name.length > 100) {
            return toast.error("A Task must not be 100 characters !")
        }

        try {
            const response = await fetch("http://localhost:5000/api/create", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: task.name,
                    status: task.status

                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create task")
            }

            if (tasks) {
                const fTasks = tasks.filter((t) => t.id !== id);
                setTasks(fTasks);
            }

            toast.success("Task Created");
            setTask({
                name: "",
                status: "todo",
            });
        } catch (error) {
            console.error("Error creating task:", error.message);
            toast.error("Failed to create task");
        }
    }


    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (task.name.length < 3) return toast.error("A Task must have more than 3 characters !");
    //     if (task.name.length > 100) return toast.error("A Task must not be 100 characters !");


    //     setTasks((prev) => {
    //         const list = [...prev, { ...task, id: uuidv4() }]

    //         localStorage.setItem("tasks", JSON.stringify(list))

    //         return list
    //     });

    //     toast.success("Task Created")

    //     setTask({
    //         id: "",
    //         name: "",
    //         status: "todo",
    //     })

    // };

    // return (<form onSubmit={handleSubmit}>
    //     <input type="text"
    //         className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
    //         value={task.name}
    //         onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}></input>
    //     <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
    // </form>);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                placeholder="Enter task name"
            />
            <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
        </form>
    );
}

export default CreateTask;