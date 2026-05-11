const format = require('pg-format');
const { pool } = require('../db/database');

const getTasks = async ({userId, limit = 10, page = 1, order_by = 'created_at_DESC', category_id, priority_id, completed}) => {
    const parts = order_by.split('_');
    
    const direction = parts.pop();
    const fieldName = parts.join('_');

    const offset = (page - 1) * limit;

    const filters = [];
    const values = [userId];
    let paramIndex = 2;

    if(category_id){
        filters.push(`t.category_id = $${paramIndex}`);
        values.push(category_id);
        paramIndex++
    }

    if(priority_id){
        filters.push(`t.priority_id = $${paramIndex}`);
        values.push(priority_id);
        paramIndex++
    }

    if(completed !== undefined && completed !== ''){
        filters.push(`t.completed = $${paramIndex}`);
        values.push(completed);
        paramIndex++
    }

    const whereClause = filters.length > 0
    ? `AND ${filters.join(' AND ')}`
    : '';

    const formattedQuery = format(`
        SELECT t.id, 
        t.task_name, 
        t.completed,
        t.created_at,
        c.name AS category_name, 
        p.name AS priority_name
        FROM tasks t
        LEFT JOIN categories c ON t.category_id = c.id
        LEFT JOIN priorities p ON t.priority_id = p.id
        WHERE t.user_id = $1
        ${whereClause}
        ORDER BY t.%I %s 
        LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
        , 
        fieldName,
        direction
    );

    values.push(limit, offset);

    const { rows: tasks } = await pool.query(formattedQuery, values);
    return tasks;
};

const getTaskById = async ( id ) => {
    const request = `SELECT * FROM tasks WHERE id = $1`;
    const values = [id];

    const result = await pool.query(request, values);
    return result.rows[0];
}

const postTask = async (task_name, category_id, priority_id, userId) => {
    const request = `INSERT INTO tasks (task_name, category_id, priority_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [task_name, category_id, priority_id, userId];
    const result = await pool.query(request, values);

    return result.rows[0];
}; 

const alterTask = async (id, task_name, category_id, priority_id) => {
    const setClauses = [];
    const values = [];
    let parameterIndex = 1;

    if(task_name !== undefined){
        setClauses.push(`task_name = $${parameterIndex}`);
        values.push(task_name);
        parameterIndex++;
    }

    if(category_id !== undefined){
        setClauses.push(`category_id = $${parameterIndex}`);
        values.push(category_id);
        parameterIndex++;
    }

    if(priority_id !== undefined){
        setClauses.push(`priority_id = $${parameterIndex}`);
        values.push(priority_id);
        parameterIndex++;
    }

    if(setClauses.length === 0){
        return null;
    }

    values.push(id);

    const request = `
    UPDATE tasks 
    SET ${setClauses.join(', ')}
    WHERE id = $${parameterIndex}
    RETURNING *
    `;

    const result = await pool.query(request, values);
    return result.rows[0];

};

const completeTask = async (id, completed) => {
    const request = `UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *`;
    const values = [completed, id];
    const result = await pool.query(request, values);

    return result.rows[0];
};

const deleteTask = async (id, user_id) => {
    const request = `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`;
    const value = [id, user_id];
    const result = await pool.query(request, value);

    return result.rows[0];
}

const getAllCategories = async () => {
    const request = "SELECT * FROM categories ORDER BY id ASC";
    const res = await pool.query(request);
    return res.rows;
};

const getAllPriorities = async () => {
    const request = "SELECT * FROM priorities ORDER BY id ASC";
    const res = await pool.query(request);
    return res.rows;
};

module.exports = { 
    getTasks, 
    postTask, 
    completeTask,
    deleteTask, 
    alterTask, 
    getAllCategories, 
    getAllPriorities, 
    getTaskById 
}