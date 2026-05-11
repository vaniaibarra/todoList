import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Tasks = () => {
    return (
        <div className="p-6 md:p-10 flex-1 flex flex-col gap-10 bg-linear-to-r from-[#f0bfce] to-[#fadbce]">
            <h1 className="text-5xl md:text-7xl text-[#78364a] text-center font-outfit font-semibold text-shadow-lg/10">
                Recordatorios
            </h1>
            
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:m-10 items-center lg:items-start">
                <section className="w-full lg:w-auto lg:max-w-none">
                    <TaskForm />
                </section>
                <section className="flex-1 w-full">
                    <TaskList/>
                </section>
            </div>
        </div>
    );
};

export default Tasks;