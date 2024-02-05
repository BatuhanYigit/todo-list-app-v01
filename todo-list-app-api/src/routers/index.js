var express = require('express');
const { createTask, getAllTasks, deleteTask } = require("../controllers/taskCreate")
const port = process.env.PORT || 5000;

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello Express!');
});

router.post('/create', createTask);
router.get('/getall', getAllTasks);
router.delete('/delete', deleteTask);

module.exports = router;