import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CategoryProgress from "../components/CategoryProcess";

const Profile = () => {
    const { user, loading } = useAuth();
    const [file, setFile] = useState(null);

    if(loading) return <p>Cargando datos usuario...</p>
    

    return (
        <div className="p-10 ml-10 grid grid-cols-1 gap-20">
            <div className="flex flex-col">
                <div className="flex gap-10">
                    <img 
                    className="flex shrink-0 rounded-full w-40 h-40 object-cover object-center border border-[#f0bfce]" 
                    src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.name}`}
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.name}`
                    }}
                    alt={user.name}
                    />
                    <div className="self-center">
                        <p 
                        className="text-5xl font-outfit"
                        >{user?.name}</p>
                        <div className="ml-2 flex flex-col gap-2">
                            <p className="font-montserrat italic">{user?.email}</p>
                            <p className="font-montserrat">Pefil creado el: {
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
                

            </div>
            <div className="ml-10 flex flex-col gap-10">
               
                 <div className="flex gap-2">
                    <Link 
                    className="bg-[#b2e2f2] text-[#008292] font-outfit px-4 py-2 rounded-md hover:bg-[#9ed8eb] transition-colors"
                    to='/tasks'>Recordatorios</Link>
                    <Link 
                    className="bg-[#d57e98] text-white font-outfit px-4 py-2 rounded-md hover:bg-[#c46d87] transition-colors"
                    to='/editProfile'>Editar perfil</Link>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h2 className="text-xl font-bold mb-4">Progreso de Tareas</h2>
                    <CategoryProgress /> 
                </div>
            </div>
        </div>
    )
}

export default Profile;