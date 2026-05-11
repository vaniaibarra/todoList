const format = require('pg-format');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/database');

const registerUser = async (user) => {
    const { name, email, password } = user;

    if(!password){
        throw new Error("El password llegó undefined al modelo");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`
    const values = [name, email, encryptedPassword];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const login = async (email, password) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email]

    const { rows : [user], rowCount } = await pool.query(query, values);
    if(!rowCount){
        throw { code: 401, message: "Email o contraseña incorrecta"}
    };
    
    const encryptedPassword = user.password;
    const passwordIsCorrect = await bcrypt.compare(password, encryptedPassword);
    
    if(!passwordIsCorrect){
        throw { code: 401, message: "Email o contraseña incorrectos"}
    }

    return user;

}

const findById = async (id) => {
    try {
        const query = "SELECT id, name, email, avatar_url, joined_on  FROM users WHERE id = $1";
        const result = await pool.query(query, [id]);

        if(result.rows.length === 0) return null;

        return result.rows[0];

    } catch (error) {
        console.error("Error en findById:", error);
        throw new Error("Error en la base de datos");
    }
};

const editUser = async (id, name, email, avatar_url) => {
    const setClauses = [];
    const values = [];
    let parameterIndex = 1;

    if(name !== undefined){
        setClauses.push(`name = $${parameterIndex}`);
        values.push(name);
        parameterIndex++
    };
    if(email !== undefined){
        setClauses.push(`email = $${parameterIndex}`);
        values.push(email);
        parameterIndex++;
    };
    if(avatar_url !== undefined){
        setClauses.push(`avatar_url = $${parameterIndex}`);
        values.push(avatar_url);
        parameterIndex++;
    };
    if(setClauses.length === 0){
        return null
    };

    values.push(id);

    const request = `
    UPDATE users 
    SET ${setClauses.join(', ')}
    WHERE id = $${parameterIndex}
    RETURNING * 
    `;

    const result = await pool.query(request, values);
    return result.rows[0];

};

module.exports = {registerUser, login, findById, editUser}