var express = require('express');
const { createTask, getAllTasks, deleteTask, getByTodo, getByClosed, getByInprogress, updateStatus } = require("../controllers/taskCreate")
const { login, register, userAuth } = require("../controllers/auth.controller")
const authValidation = require("../middlewares/validations/auth.validation")
const { tokenCheck } = require("../middlewares/auth")
require('dotenv').config();


const port = process.env.PORT || 5000;

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {

    res.send('Hello Express!');
});

router.post('/create', createTask);
router.get('/get-all', getAllTasks);
router.delete('/delete/:id', deleteTask);
router.get('/get-todo', getByTodo);
router.get('/get-closed', getByClosed);
router.get('/get-inprogress', getByInprogress);
router.put('/update-status/:id', updateStatus);

router.post("/login", authValidation.login, login)

router.post("/register", authValidation.register, register)

router.get("/auth", tokenCheck, userAuth)

module.exports = router;