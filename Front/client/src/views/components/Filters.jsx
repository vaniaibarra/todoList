 import { useEffect, useState } from "react";
import { useTasks } from "../../context/TaskContext";

 const Filters = ({onClose}) => {
    const { getCategories, getPriorities, categories, priorities, getTasks } = useTasks();

    const [ filters, setFilters ] = useState({
        category_id: '',
        priority_id: '',
        completed: '',
        order_by: 'created_at_DESC'
    });

    useEffect(() => {
        getCategories();
        getPriorities();
    }, []);

    const handleChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    const handleApply = () => {
        getTasks(filters);
        onClose();
    };

    const handleReset = () => {
        setFilters({
            category_id: '',
            priority_id: '',
            completed: '',
            order_by: 'created_at_DESC'
        });
        getTasks({});
        onClose();
    }

    return (
        <div className="p-5 bg-white rounded-lg">
            <div className="flex flex-col gap-7">
                <section className="flex flex-col">
                    <label className="font-outfit font-bold">Ordenar por</label>
                    <select 
                    name="order_by"
                    value={filters.order_by}
                    onChange={handleChange}
                    className="border rounded-sm">
                        <option>--Selecciona una--</option>
                        <option value="created_at_DESC">Más recientes</option>
                        <option value="created_at_ASC">Más antiguas</option>
                    </select>
                </section>
                <section className="flex flex-col">
                    <label className="font-outfit font-bold">Categoría</label>
                    <select 
                    name="category_id"
                    value={filters.category_id}
                    onChange={handleChange}
                    className="border rounded-sm">
                        <option value="">Todas</option>
                        {
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))
                        }
                    </select>
                </section>
                <section className="flex flex-col">
                    <label className="font-outfit font-bold">Prioridad</label>
                    <select 
                    name="priority_id"
                    value={filters.priority_id}
                    onChange={handleChange}
                    className="border rounded-sm">
                      <option value="">Todas</option>  
                        {
                            priorities.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))
                        }
                    </select>
                </section>
                <section className="flex gap-3">
                    <label>Estado</label>
                    <select 
                    name="completed"
                    value={filters.completed}
                    onChange={handleChange}
                    className="border rounded-sm"
                    >
                        <option value="">Todos</option>
                        <option value="true">Completados</option>
                        <option value="false">Pendientes</option>
                    </select>
                </section>
                <div className="flex gap-5">
                    <button 
                    onClick={handleApply}
                    className="bg-[#b2e2f2] text-[#008292] font-outfit px-4 py-2 rounded-md hover:bg-[#9ed8eb] transition-colors">Filtrar</button>
                    <button 
                    onClick={handleReset}
                    className="bg-[#b2e2f2] text-[#008292] font-outfit px-4 py-2 rounded-md hover:bg-[#9ed8eb] transition-colors">Limpiar filtros</button>
                </div>
            </div>
        </div>
    )
 }

 export default Filters;