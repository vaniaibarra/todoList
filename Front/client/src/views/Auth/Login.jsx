import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit, formState: {errors} } = useForm();
    const { signin, isAuthenticated, errors: loginErrors } = useAuth();  

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (values) => {
        await signin(values);
        navigate('/tasks');
    });
    

    return (
        <div className="flex-1 flex items-center justify-center bg-linear-to-r from-[#cde0e1] to-[#e3ccdc] ">
            <div className="border border-white/20 bg-white/30 backdrop-blur-lg shadow-2xl rounded-lg flex flex-col w-full max-w-md p-10 gap-6">
                <div>
                    <h1 className='text-5xl text-[#008292] text-center font-outfit font-semibold'>Inicia Sesión</h1>
                    {loginErrors.map((error, i) => (
                        <div key={i}>
                            {error}
                        </div>
                    ))}
                </div>
                <form onSubmit={onSubmit} className='flex flex-col gap-3 items-center'>
                    <div className='flex flex-col w-full'>
                        <label className='font-montserrat'>Email</label>
                        <input
                        type='email'
                        placeholder='user@mail.com'
                        {...register("email", {required: "El correo es obligatorio"})}
                        className='border border-indigo-900/55 rounded-sm p-1 hover:backdrop-blur-md'
                        />
                        {errors.email && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.email.message}</p>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-montserrat'>Contraseña</label>
                        <input
                        type='password'
                        placeholder='******'
                        {...register("password", {required: "La contraseña es obligatoria"})}
                        className='border border-indigo-900/55 rounded-sm p-1 hover:backdrop-blur-md'
                        />
                        {errors.password && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.password.message}</p>}
                    </div>
                    <button type='submit' className='bg-[#008292] text-white font-semibold font-outfit w-40 p-1.5 rounded-md hover:bg-[#014d57]'>Ingresar</button>
                </form>
                <p className="text-center text-xs font-montserrat">
                    ¿No tienes cuenta? <Link to="/register" className="text-[#008292] font-bold hover:underline underline-offset-1">Regístrate</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;