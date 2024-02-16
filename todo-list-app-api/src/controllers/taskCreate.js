const task = require("../models/task.model")
const { response } = require("express");
const APIError = require("../utils/errors");
const Response = require("../utils/response");


const getById = async (req, res, next) => {
    const { taskID } = req.body.id
    try {
        const getByTask = await task.getById(taskID);

        if (!getByTask) {
            throw new APIError("Task not found", 404);
        }
        return new Response(task, "Task deleted").success(res)
    } catch (err) {
        console.error(err);
        next(err)
    }
}

const getAllTasks = async (req, res, next) => {
    try {
        const userId = req.user._id
        const tasks = await task.find({ userId });
        return new Response(tasks, "All tasks").success(res);
    } catch (err) {
        console.error(err);
        next(err)
    }
}

const getByTodo = async (req, res, next) => {
    try {
        const userId = req.user._id
        const tasks = await task.find({ userId, status: "todo" });
        return new Response(tasks, "Todo all").success(res);

    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getByInprogress = async (req, res, next) => {
    try {
        const userId = req.user._id
        const tasks = await task.find({ userId, status: "inprogress" });
        return new Response(tasks, "inprogress all").success(res);

    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getByClosed = async (req, res, next) => {
    try {
        const userId = req.user._id
        const tasks = await task.find({ userId, status: "closed" });
        return new Response(tasks, "closed all").success(res);

    } catch (err) {
        console.error(err)
        next(err)
    }
}

const deleteTask = async (req, res, next) => {
    const taskId = req.params.id;
    try {
        if (!taskId) {
            throw new APIError("Task id required")
        }
        const deleteTask = await task.findByIdAndDelete(taskId)

        if (!deleteTask) {
            throw new APIError("Task not found", 404);
        }

        return new Response(task, "Task deleted").success(res)
    } catch (err) {
        console.error(err);
        next(err)
    }

}




const createTask = async (req, res, next) => {
    const { name } = req.body

    try {

        const userId = req.user._id;

        const taskCheck = await task.findOne({ name });

        if (taskCheck) {
            const error = new APIError("Task already use!", 401);
            return next(error);
        }

        const taskSave = new task({ name, userId, status: 'todo' });
        const savedTask = await taskSave.save();
        return new Response(savedTask, "Task Created").created(res);
    } catch (err) {
        console.error(err);
        next(err);
    }
};


const updateStatus = async (req, res, next) => {
    const id = req.params.id;

    const { newStatus } = req.body;

    try {
        if (!newStatus) {
            throw new APIError("Task id and new status required !", 400)
        }

        console.log("IDDDDDD", id)

        const findTask = await task.findById(id);

        if (!findTask) {
            throw new APIError("Task not found", 404);
        }

        findTask.status = newStatus;

        const updatedTask = await findTask.save();

        return new Response(updatedTask, "Task status updated").success(res);
    } catch (err) {
        console.error(err);
        next(err);
    }

}





module.exports = { createTask, getAllTasks, deleteTask, getById, getByTodo, getByClosed, getByInprogress, updateStatus, };