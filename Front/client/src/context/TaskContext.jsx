import { createContext, useContext, useState } from "react";
import {
    getTasksRequest,
    newTaskRequest,
    alterTaskRequest,
    deleteTaskRequest,
    getCategoriesRequest,
    getPrioritiesRequest,
    completeTaskRequest,
    getOneTaskRequest
} from '../api/tasks';

export const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if(!context) throw new Error("useTasks debe estar dentro de un TaskProvider");
    return context;
};

export function TaskProvider({children}) {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const getTasks = async (filters = {}) => {
        try {
            const res = await getTasksRequest(filters);
            setTasks(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    const getOneTask = async (id) => {
        try {
            const res = await getOneTaskRequest(id);
            return res.data;

        } catch (error) {
            console.error(error);
        }
    };

    const createTask = async (task) => {
        try {
            const res = await newTaskRequest(task);
            setTasks([...tasks, res.data]);
            getTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if(res.status === 204){
                setTasks(tasks.filter((tasks) => task.id !== id));
            }
            await getTasks();
        } catch (error) {
            console.log(error);
        }
    };

    const alterTask = async (id, task) => {
        try {
            await alterTaskRequest(id, task);
            
            await getTasks();
        } catch (error) {
            console.log("Error al editar la tarea:" ,error)
        }
    };

    const toggleTaskStatus = async (task) => {
        try {
            const newStatus = !task.completed;

            const res = await completeTaskRequest(task.id, newStatus);

            setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
            getTasks();
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
        }
    };

    const getCategories = async () => {
        try {
            const res = await getCategoriesRequest();

            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getPriorities = async () => {
        try {
            const res = await getPrioritiesRequest();
            
            setPriorities(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TaskContext.Provider
        value={{
            getTasks,
            getOneTask,
            createTask,
            deleteTask,
            alterTask,
            toggleTaskStatus,
            categories,
            priorities,
            tasks,
            getCategories,
            getPriorities
        }}
        >
            {children}
        </TaskContext.Provider>
    )

}