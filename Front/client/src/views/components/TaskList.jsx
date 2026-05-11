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
        <div className="border border-white/20 bg-white/30 backdrop-blur-lg shadow-2xl rounded-lg flex flex-col w-full h-[46vh] p-10 gap-6">
            <div className="absolute z-9999 right-12 flex flex-col items-end">
               <button className="bg-pink-400/25 text-[#683a48] font-outfit font-bold p-2 rounded-sm" onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? 'x' : 'Filtrar'}
               </button>
               {
                showFilters && (
                    <div>
                        <Filters onClose={() => setShowFilters(false)} />
                    </div>
                )
               }
            </div>
        <div>
            <h1 className="text-5xl text-[#d57e98] text-center font-outfit font-medium">
                Recordatorios
            </h1>
        </div>
        <div>
            <ul className="overflow-y-auto max-h-72">
                
                {
                tasks.length === 0 ? 
                <p className="font-outfit font-bold text-center text-2xl text-[#395a78]"
                >No tienes recordatorios</p>
                :
                tasks.map((t) => (
                    <li 
                        key={t.id} 
                        className="font-outfit flex items-center justify-between w-full p-6 mb-4 bg-white/40 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 transition-all hover:shadow-md"
                    >
                        
                        <div className="flex items-center gap-4 flex-1">
                            <input 
                                type="checkbox"
                                checked={t.completed}
                                onChange={() => toggleTaskStatus(t)}
                                className="w-6 h-6 accent-[#d57e98] cursor-pointer"
                            />
                            <div className="flex flex-col">
                                <span className={`text-2xl ${t.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                    {t.task_name}
                                </span>
                                
                                
                                <div className="flex gap-6 mt-2 text-sm text-gray-600">
                                    <p><span className="font-bold text-[#d57e98]">Categoría:</span> {t.category_name}</p>
                                    <p><span className="font-bold text-[#d57e98]">Prioridad:</span> {t.priority_name}</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleEdit(t.id)}
                                className="bg-[#b2e2f2] text-[#008292] font-outfit px-4 py-2 rounded-md hover:bg-[#9ed8eb] transition-colors"
                            >
                                Editar
                            </button>

                            {t.completed && (
                                <button 
                                onClick={() => handleDelete(t.id)}
                                className="bg-[#d57e98] text-white font-outfit px-4 py-2 rounded-md hover:bg-[#c46d87] transition-colors">
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