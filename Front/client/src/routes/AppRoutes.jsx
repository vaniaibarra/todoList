import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '../views/Register';
import Login from '../views/Login';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../views/Profile';
import Tasks from '../views/Tasks';
import EditProfile from '../views/EditProfile';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />

            <Route path='/' element={<Navigate to='/login' />}/>


            <Route element={<ProtectedRoute/>}>
                <Route path='/tasks' element={<Tasks/>} />
                <Route path='/tasks/:id' element={<Tasks/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/editProfile' element={<EditProfile/>} />
            </Route>

            <Route path='*' element={<h1>404 - NOT FOUND</h1>} />
        </Routes>
    )
};

export default AppRoutes;