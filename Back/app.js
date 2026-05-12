const express = require('express');
const cors = require('cors');
const app = express();

const tasksRouter = require('./src/routes/tasksRoute');
const UserRouter = require('./src/routes/userRoutes');
const UploadRouter = require('./src/routes/uploadRoutes');

const allowedOrigins = [
  'https://todo-list-teal-chi-97.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/tasks', tasksRouter);
app.use('/user', UserRouter);
app.use('/api/upload', UploadRouter);

module.exports = app;