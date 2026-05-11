const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const claudinaryService = require('../services/cloudinaryService');

const JWT_SECRET = process.env.JWT_SECRET || "az_AZ";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password){
            return res.status(400).send("Todos los campos son obligatorios")
        }

        const newUser = await UserModel.registerUser({name, email, password});
        const { password: _, ...userWithoutPassword } = newUser;

        const token = jwt.sign(
            { id: userWithoutPassword.id }, 
            JWT_SECRET, 
            {expiresIn: '2h'});

        res.status(201).json({
            ...userWithoutPassword,
            token: token
        });
        return

    } catch (error) {
        if(error.code === '23505'){
            return res.status(400).json({message: "Este email ya está registrado", detail: error.detail});
        }

        console.log("ERROR NO MANEJADO:", error);
        res.status(500).json({error: "Internal server error"})
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.login(email, password)

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            {expiresIn: '2h'}
        );

        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            ...userWithoutPassword,
            token: token
        });

    } catch (error) {
        res.status(401).json({ error: error.message || "Credenciales inválidas" });
    }
};

const verifyToken = async (req, res) => {
    try {
        const userFound = await UserModel.findById(req.user.id);

        if(!userFound) return res.status(401).json({message: "Usuario no existe"});

        return res.json({
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            avatar_url: userFound.avatar_url,
            joined_on: userFound.joined_on
        });
    } catch (error) {
        return res.status(500).json({message: "Error al verificar token"});
    }
};

const editProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, email, avatar_url } = req.body;
        if(!id){
            return res.status(400).json({error: 'Debes ingresar un id'})
        };

        const currentUser = await UserModel.findById(id);
        
        if(avatar_url && currentUser?.avatar_url && avatar_url !== currentUser.avatar_url){
            await claudinaryService.deleteFromCloudinary(currentUser.avatar_url);
        }

        const editedUser = await UserModel.editUser(id, name, email, avatar_url);
        res.status(200).json(editedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = { registerUser, login, verifyToken, editProfile }