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
        const tasks = await task.find();
        return new Response(tasks, "All tasks").success(res);
    } catch (err) {
        console.error(err);
        next(err)
    }
}

const deleteTask = async (req, res, next) => {
    const taskId = req.body.id;
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
        const taskCheck = await task.findOne({ name });

        if (taskCheck) {
            const error = new APIError("Task already use!", 401);
            return next(error);
        }

        const taskSave = new task(req.body);
        const savedTask = await taskSave.save();
        return new Response(savedTask, "Task Created").created(res);
    } catch (err) {
        console.error(err);
        next(err); // Hata durumunu errorHandlerMiddleware'e iletiyoruz
    }
};



module.exports = { createTask, getAllTasks, deleteTask, getById };