import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CategoryProgress from "../components/CategoryProcess";

const Profile = () => {
    const { user, loading } = useAuth();
    const [file, setFile] = useState(null);

    if(loading) return <p className="p-4 text-center">Cargando datos usuario...</p>
    
    return (
        <div className="p-4 sm:p-10 w-full max-w-4xl mx-auto flex flex-col gap-10 md:gap-16">
            
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 text-center sm:text-left">
                <img 
                    className="shrink-0 rounded-full w-32 h-32 sm:w-40 sm:h-40 object-cover object-center border-4 border-[#f0bfce] shadow-md" 
                    src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}`}
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.name}`
                    }}
                    alt={user.name}
                />
                <div className="self-center flex flex-col gap-2">
                    <p className="text-4xl sm:text-5xl font-outfit font-semibold text-gray-800">
                        {user?.name}
                    </p>
                    <div className="flex flex-col gap-1 text-gray-600">
                        <p className="font-montserrat italic">{user?.email}</p>
                        <p className="font-montserrat text-sm">Perfil creado el: {
                                new Date(user?.joined_on).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                                })
                            }
                        </p>
                    </div>
                </div>
            </div>

            
            <div className="flex flex-col gap-8">
                 <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                    <Link 
                        className="bg-[#b2e2f2] text-[#008292] font-outfit px-6 py-2 rounded-md hover:bg-[#9ed8eb] transition-colors shadow-sm"
                        to='/tasks'>
                        Recordatorios
                    </Link>
                    <Link 
                        className="bg-[#d57e98] text-white font-outfit px-6 py-2 rounded-md hover:bg-[#c46d87] transition-colors shadow-sm"
                        to='/editProfile'>
                        Editar perfil
                    </Link>
                </div>

                <div className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 text-center sm:text-left">Progreso de Tareas</h2>
                    <CategoryProgress /> 
                </div>
            </div>
        </div>
    )
}

export default Profile;