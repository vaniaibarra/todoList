import api from './axios';


export const getTasksRequest = (params = {}) => {
    const { page = 1, limit = 10, category_id, priority_id, completed, order_by } = params;
    
    const query = new URLSearchParams({ page, limit });
    
    if (category_id) query.append('category_id', category_id);
    if (priority_id) query.append('priority_id', priority_id);
    if (completed !== undefined && completed !== '') query.append('completed', completed);
    if (order_by) query.append('order_by', order_by);

    return api.get(`/tasks?${query.toString()}`);
};

export const getOneTaskRequest = (id) => api.get(`/tasks/${id}`);

/**
 * @param { Object } task - {task_name, priority_id}
 */

export const newTaskRequest = (task) => api.post('/tasks', task);

/**
 * @param { number } id - ID tarea a editar
 * @param { Object } task - Campos a cambiar
 */
export const alterTaskRequest = (id, task) => api.patch(`/tasks/${id}`, task);

export const completeTaskRequest = (id, completed) => api.patch(`/tasks/${id}/toggle`, {completed});

/**
 * @param { number } id;
 */
export const deleteTaskRequest = (id) => api.delete(`/tasks/${id}`);

export const getCategoriesRequest = () => api.get('/tasks/categories');

export const getPrioritiesRequest = () => api.get('/tasks/priorities');