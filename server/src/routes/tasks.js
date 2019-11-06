const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Metodo Leer
router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Metodo Leer por ID
router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

// Metodo Crear
router.post('/', async(req, res) => {
    const { email, password } = req.body;
    const task = new Task({
        email: email,
        password: password
    });
    await task.save();
    res.json("Tarea guardada");
});

// Metodo Actualizar por ID
router.put('/:id', async(req, res) => {
    const { email, password } = req.body;
    const newTask = {
        email: email,
        password: password
    };
    await Task.findByIdAndUpdate(req.params.id, newTask, { useFindAndModify: false });
    res.json("Tarea actualizada");
});

// Metodo Eliminar por ID
router.delete('/:id', async(req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Tarea eliminada");
});

module.exports = router;