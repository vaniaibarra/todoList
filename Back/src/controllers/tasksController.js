const TaskModel = require('../models/tasksModel');


const getTasks = async (req, res) => {
    try {
        const { limit, page, order_by, category_id, priority_id, completed } = req.query;
        const tasks = await TaskModel.getTasks({
            userId: req.user.id,
            limit,
            page,
            order_by,
            category_id,
            priority_id,
            completed: completed !== undefined ? completed === 'true' : undefined
        });
        res.json(tasks)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
};

const getOneTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.getTaskById(id);

        if(!task){
            return res.status(404).json({message: "Tarea no encontrada"});
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({error: "Error al obtener la tarea"});
    }
};

const postTask = async (req, res) => {
    try {
        const {task_name, category_id, priority_id} = req.body;
        const userId = req.user.id;

        if(!task_name){
            return res.status(400).json({ error: 'El nombre de la tarea es obligatoria'})
        }
        const newTask = await TaskModel.postTask(task_name, category_id, priority_id, userId);

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const alterTask = async (req, res) => {
    try {
        const { id } = req.params
        const { task_name, category_id, priority_id } = req.body
        if(!id){
            return res.status(400).json({error: 'Debes ingresar un id'})
        }

        if(task_name === undefined && category_id === undefined && priority_id === undefined){
            return res.status(400).json({error: 'Debe proveer task_name o priority para actualizar'})
        }
        const updatedTask = await TaskModel.alterTask(id, task_name, category_id, priority_id);

        if(!updatedTask){
            return res.status(400).json({error: 'Tarea no encontrada'});
        }
        res.status(200).json(updatedTask)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const completeTask = async (req, res) => {
    try {
        const { id } = req.params
        const { completed } = req.body

        if(!id){
            return res.status(400).json({error: 'Debe ingresar un id'})
        }
        if(typeof completed !== 'boolean'){
            return res.status(400).json({error: 'El estado completed debe ser de tipo boolean'})
        }
        const completedTask = await TaskModel.completeTask(id, completed);

        if(!completedTask){
            return res.status(404).json({error: 'Tarea no encontrada'});
        }

        res.status(200).json(completedTask);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const useId = req.user.id;

        if(!id){
            return res.status(400).json({error: 'Debe ingresar un id'})
        }

        const deletedTask = await TaskModel.deleteTask(id, useId);

        if(!deletedTask){
            return res.status(404).json({error: 'Tarea no encontrada'})
        }
        res.status(200).json(deletedTask)
    } catch (error) {
        return res.status(500).json({error: 'Internal server error'})
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await TaskModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'});
    }
};

const getPriorities = async (req, res) => {
    try {
        const priorities = await TaskModel.getAllPriorities();
        res.json(priorities);
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports = { getTasks, postTask, alterTask, completeTask, deleteTask, getCategories, getPriorities, getOneTask }