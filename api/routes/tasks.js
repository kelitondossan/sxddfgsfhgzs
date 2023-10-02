const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksControllers');

// Rotas para tarefas
router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
