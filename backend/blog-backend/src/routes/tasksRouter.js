const express = require('express')
const taskController = require('../controllers/tasksControllers')

const taskRouter = express.Router()

taskRouter.get('/tasks', taskController.getAll)

module.exports = taskRouter
