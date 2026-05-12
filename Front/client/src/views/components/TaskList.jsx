import { useEffect, useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import Filters from "./Filters";

const TaskList = () => {

    const [showFilters, setShowFilters] = useState(false);

    const { tasks, getTasks, toggleTaskStatus, deleteTask } = useTasks();
    useEffect(() => {
        getTasks();
    }, []);

    const navigate = useNavigate();
    const params = useParams();

    const handleEdit = (id) => {
        navigate(`/tasks/${id}`)
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("¿Estás seguro/a de que quieres eliminar esta tarea?");
        if(confirmed){
            await deleteTask(id);

            if(params.id === id){
                navigate('/tasks');
            }
        }
    };

    return (
        <div className="relative border border-white/20 bg-white/30 backdrop-blur-lg shadow-2xl rounded-lg flex flex-col w-full h-full min-h-[50vh] p-4 sm:p-10 gap-6">
            
            {/* Contenedor del filtro ajustado */}
            <div className="absolute z-50 top-4 right-4 sm:top-8 sm:right-8 flex flex-col items-end">
               <button 
                    className="bg-pink-400/30 hover:bg-pink-400/50 text-[#683a48] transition-colors font-outfit font-bold px-4 py-2 rounded-md shadow-sm" 
                    onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? 'Cerrar Filtros x' : 'Filtrar'}
               </button>
               {
                showFilters && (
                    <div className="mt-2 bg-white p-4 rounded-lg shadow-xl border border-pink-100">
                        <Filters onClose={() => setShowFilters(false)} />
                    </div>
                )
               }
            </div>

            <div className="mt-12 sm:mt-0">
                <h1 className="text-4xl sm:text-5xl text-[#d57e98] text-center font-outfit font-medium">
                    Recordatorios
                </h1>
            </div>
            
            <div className="flex-1">
                <ul className="overflow-y-auto max-h-[60vh] sm:max-h-125 pr-2 custom-scrollbar">
                    {
                    tasks.length === 0 ? 
                    <p className="font-outfit font-bold text-center text-xl sm:text-2xl text-[#395a78] mt-10">
                        No tienes recordatorios pendientes
                    </p>
                    :
                    tasks.map((t) => (
                        <li 
                            key={t.id} 
                            className="font-outfit flex flex-col xl:flex-row items-start xl:items-center justify-between w-full p-4 sm:p-6 mb-4 bg-white/50 backdrop-blur-md rounded-xl shadow-sm border border-white/40 transition-all hover:shadow-md gap-4 xl:gap-0"
                        >
                            <div className="flex items-start sm:items-center gap-4 flex-1 w-full">
                                <input 
                                    type="checkbox"
                                    checked={t.completed}
                                    onChange={() => toggleTaskStatus(t)}
                                    className="w-6 h-6 mt-1 sm:mt-0 accent-[#d57e98] cursor-pointer shrink-0"
                                />
                                <div className="flex flex-col w-full">
                                    <span className={`text-xl sm:text-2xl wrap-break-word ${t.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                        {t.task_name}
                                    </span>
                                    
                                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-gray-600">
                                        <p><span className="font-bold text-[#d57e98]">Categoría:</span> {t.category_name}</p>
                                        <p><span className="font-bold text-[#d57e98]">Prioridad:</span> {t.priority_name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full xl:w-auto justify-end mt-2 xl:mt-0 border-t xl:border-none border-gray-200/50 pt-3 xl:pt-0">
                                <button
                                    onClick={() => handleEdit(t.id)}
                                    className="bg-[#b2e2f2] text-[#008292] font-outfit px-4 py-2 text-sm sm:text-base rounded-md hover:bg-[#9ed8eb] transition-colors"
                                >
                                    Editar
                                </button>

                                {t.completed && (
                                    <button 
                                    onClick={() => handleDelete(t.id)}
                                    className="bg-[#d57e98] text-white font-outfit px-4 py-2 text-sm sm:text-base rounded-md hover:bg-[#c46d87] transition-colors">
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TaskList;