import { render, screen } from "@testing-library/react";
import Tasks from "./Tasks";
import { BrowserRouter } from "react-router-dom";
import { TaskContext } from "../../context/TaskContext";
import { AuthContext } from "../../context/AuthContext";
import { expect, describe, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TaskList from "../components/TaskList";

describe('CRUD de tareas', () => {
    const mockAuthValue = {
        user: { id: 1, name: 'Vania Ibarra', email: 'vania@test.com'},
        setUser: () => {}
    };

    const mockTaskValue = {
        tasks: [
            {id: 1, task_name: 'Test', completed: false, category_name: 'Trabajo', priority_name: 'Urgente'},
            {id: 2, task_name: 'Segunda tarea', completed: true, category_name: 'Trabajo', priority_name: 'Urgente'}
        ],
        categories: [
            {id: 1, name: 'Trabajo'}
        ],
        priorities: [
            {id: 1, name: 'Urgente'}
        ],

        getTasks: vi.fn(),
        getCategories: vi.fn(),
        getPriorities: vi.fn(),
        createTask: vi.fn()
    };

    const renderWithProviders = (component, taskOverrides = {}) => {

        const finalTaskValue = {...mockTaskValue, ...taskOverrides };
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthValue}>
                    <TaskContext.Provider value={finalTaskValue}>
                        {component}
                    </TaskContext.Provider>
                </AuthContext.Provider>
            </BrowserRouter>
        )
    };

    it('debe renderizar la lista con las tareas iniciales', () => {
        renderWithProviders(<Tasks/>);
        const taskElement = screen.getByText('Test');
        expect(taskElement).toBeInTheDocument();
    });

    it('debe crear una nueva tarea al utilizar el formulario', async () => {
        const user = userEvent.setup();
        const spyCreateTask = vi.fn();

        renderWithProviders(<Tasks/>, {createTask: spyCreateTask});

        const inputTask = screen.getByPlaceholderText(/Estudiar/i);
        const button = screen.getByRole('button', {name: /Agregar/i});
        
        const selects = screen.getAllByRole('combobox');
        const selectCategory = selects[0];
        const selectPriority = selects[1];

        await user.type(inputTask, 'Comprar pan');

        await user.selectOptions(selectCategory, '1');
        await user.selectOptions(selectPriority, '1');

        await user.click(button);
        expect(spyCreateTask).toHaveBeenCalled();
    });

    it('debe marcar la tarea como completada', async () => {
        const user = userEvent.setup();
        const spyToggleTaskStatus = vi.fn();

        renderWithProviders(<Tasks/>, {toggleTaskStatus: spyToggleTaskStatus});
        const checkBox = screen.getAllByRole('checkbox');
        const firstCheckBox = checkBox[0];

        await user.click(firstCheckBox);
        expect(spyToggleTaskStatus).toHaveBeenCalled();
    });

    it('debe eliminar una tarea', async () => {
        const user = userEvent.setup();
        const spyDeleteTask = vi.fn();

        const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

        renderWithProviders(<Tasks/>, {deleteTask: spyDeleteTask});
        const deleteButton = screen.getByRole('button', {name: /Eliminar/i});

        await user.click(deleteButton);
        expect(spyDeleteTask).toHaveBeenCalled();
        confirmSpy.mockRestore();

    });
});