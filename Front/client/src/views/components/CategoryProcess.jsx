import { useTasks } from "../../context/TaskContext";
import { useEffect } from "react";


const CIRCUMFERENCE = 2 * Math.PI * 33;

const CATEGORY_COLORS = {
  estudio: "#534AB7",
  trabajo: "#185FA5",
  personal: "#D4537E",
  hogar: "#1D9E75",
  entrenamiento: "#EF9F27",
  general: "#D85A30",
};

const CategoryProgress = () => {
  const { tasks, categories, getTasks, getCategories } = useTasks();

  
  useEffect(() => {
    getTasks();
    getCategories();
  }, []); 


  
  if (categories.length === 0) return <p className="text-gray-400">Cargando categorías...</p>;

  const stats = categories.map((cat) => {
    const catTasks = tasks.filter(
      (t) => t.category_name?.toLowerCase() === cat.name.toLowerCase()
  );

  
  const total = catTasks.length;
  const done = catTasks.filter((t) => t.completed).length;

  // LOGS DE CONTROL 
  console.log(`Categoría: ${cat.name} | Encontradas: ${total} | Hechas: ${done}`);

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  const color = CATEGORY_COLORS[cat.name.toLowerCase()] ?? "#888780";

  return { ...cat, total, done, pct, offset, color };
});

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mt-6">
      {stats.map((cat) => (
        <div 
          key={cat.id} 
          className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
        >
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" width="80" height="80" className="-rotate-90">
              <circle cx="40" cy="40" r="33" fill="none" stroke="#e5e7eb" strokeWidth="7" />
              <circle
                cx="40" cy="40" r="33" fill="none"
                stroke={cat.color}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={cat.offset}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
              {cat.pct}%
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {cat.name}
          </span>
          <span className="text-xs text-gray-400">
            {cat.done}/{cat.total}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryProgress;