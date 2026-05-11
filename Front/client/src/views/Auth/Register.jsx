import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');
    
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate('/profile');
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        const { confirmPassword, ...userWithoutConfirm } = values;

        signup(userWithoutConfirm);
        console.log(userWithoutConfirm);
    });

    return (
        <div className='flex-1 flex items-center justify-center bg-linear-to-r from-[#f2e6ee] to-[#977dff]'>
            <div className='border border-white/20 bg-white/30 backdrop-blur-lg shadow-2xl rounded-lg flex flex-col w-full max-w-md p-10 gap-6'>

                <div>
                    <h1 className='text-5xl text-[#977dff] text-center font-outfit font-semibold'>Regístrate</h1>
                    
                </div>
                <form onSubmit={onSubmit} className='flex flex-col gap-3 items-center'>
                    <div className='flex flex-col w-full'>
                        <label className='font-montserrat'>Nombre</label>
                        <input
                        type='text'
                        placeholder='Ross Geller'
                        {...register("name", {
                            required: "Tu nombre es obligatorio",
                            minLength: { value: 3, message: "Mínimo 3 caracteres"}
                        })}
                        className='border border-indigo-900/55 rounded-sm p-1 hover:backdrop-blur-md'
                        />
                        {errors.name && <p className='text-[10px] text-red-600 font-bold mt-1'>{errors.name.message}</p>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-montserrat'>Correo</label>
                        <input
                        type='email'
                        placeholder='user@mail.com'
                        {...register("email", {
                            required: "El correo es obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email no válido"
                            }
                        })}
                        className='border border-indigo-900/55 rounded-sm p-1 hover:backdrop-blur-md'
                        />
                        {errors.email && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.email.message}</p>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-montserrat'>Contraseña</label>
                        <input
                        type='password'
                        placeholder='******'
                        {...register("password", {
                            required: "La clave es obligatoria",
                            minLength: {value: 6, message: "Debe tener al menos 6 caracteres"}
                        })}
                        className='border border-indigo-900/55 rounded-sm p-1 hover:backdrop-blur-md'
                        />
                        {errors.password && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.password.message}</p>}
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-montserrat'>Confirmar contraseña</label>
                        <input
                        type='password'
                        placeholder='******'
                        {...register("confirmPassword", {
                            required: "Debes confirmar tu contraseña",
                            validate: (value) => value === password || "Las contraseñas no coinciden"
                        })}
                        className='border border-indigo-900/55 rounded-sm p-1 hover:backdrop-blur-md'
                        />
                        {errors.confirmPassword && <p className="text-[10px] text-red-600 font-bold mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type='submit' className='bg-[#0033ff] text-white font-semibold font-outfit w-40 p-1.5 rounded-md hover:bg-[#0600ab]'>
                        Crear cuenta
                    </button>
                </form>
                <p className="text-center text-xs font-montserrat">
                    ¿Ya tienes cuenta? <Link to="/login" className="text-[#0033ff] font-bold hover:underline underline-offset-1">Inicia sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;