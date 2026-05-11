const express = require('express');
const cors = require('cors');
const app = express();

const tasksRouter = require('./src/routes/tasksRoute');
const UserRouter = require('./src/routes/userRoutes');
const UploadRouter = require('./src/routes/uploadRoutes');

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/tasks', tasksRouter);
app.use('/user', UserRouter);
app.use('/api/upload', UploadRouter);

module.exports = app;