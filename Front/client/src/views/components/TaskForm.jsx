import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTasks } from "../../context/TaskContext";

const TaskForm = () => {

    const { 
        categories, 
        priorities, 
        getCategories, 
        getPriorities, 
        createTask, 
        getOneTask,
        alterTask
    } = useTasks();
    const { register, handleSubmit, reset, setValue } = useForm();

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
        getPriorities();
    }, []);

    useEffect(() => {
    async function loadTask() {
        
        if (params.id && categories.length > 0 && priorities.length > 0) {
            const task = await getOneTask(params.id);
            
            if (task) {
                reset({
                    task_name: task.task_name,
                    category_id: task.category_id, 
                    priority_id: task.priority_id
                });
            }
        } else if (!params.id) {
            reset({
                task_name: "",
                category_id: "",
                priority_id: ""
            });
        }
    }
    loadTask();
}, [params.id, categories, priorities, reset]);

    const onSubmit = async (data) => {
        if(params.id){
            await alterTask(params.id, data);
        }else{
            await createTask(data);
            reset();
        }
        navigate('/tasks');
    };

    

return (
    
    <div className="border border-white/20 bg-white/30 backdrop-blur-lg shadow-2xl rounded-lg flex flex-col w-full p-5 sm:p-8 md:p-10 gap-6">
        <div className="flex flex-col gap-5">
            <div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#d57e98] text-center font-outfit font-medium">
                    {params.id ? "Editar Recordatorio" : "Nuevo Recordatorio"}
                </h2>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                    <label className="font-montserrat font-semibold">Recordatorio</label>
                    
                    <input
                        placeholder="Estudiar"
                        className="border rounded-md p-1 w-full"
                        {...register("task_name", { required: "..." })}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-montserrat font-semibold">Categoría</label>
                    
                    <select
                        className="border rounded-md p-0.5 w-full min-w-0"
                        {...register("category_id")}
                    >
                        <option value="">Selecciona Categoría</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-montserrat font-semibold">Prioridad</label>
                   
                    <select
                        className="border rounded-md p-0.5 w-full min-w-0"
                        {...register("priority_id")}
                    >
                        <option value="">-- Selecciona una --</option>
                        {priorities.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="border-2 border-[#f0bfce] bg-[#f4b6c9] hover:bg-[#f0bfce] text-white font-montserrat font-semibold rounded-md p-1">
                        {params.id ? "Actualizar" : "Agregar"}
                    </button>
                    {params.id && (
                        <button type="button" onClick={() => navigate("/tasks")}
                            className="bg-gray-200 text-gray-500 p-2 rounded-md">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    </div>
)
}

export default TaskForm;