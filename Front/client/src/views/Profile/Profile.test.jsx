import { render, screen } from '@testing-library/react';
import Profile from './Profile'; 
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import { expect, describe, it, vi } from 'vitest';

describe('Componente Profile', () => {

    const mockTaskValue = {
        tasks: [
            {id: 1, name: 'Test', completed: false, category_name: 'Trabajo'}
        ],
        categories: [
            {id: 1, name: 'Trabajo'}
        ],

        getTasks: vi.fn(),
        getCategories: vi.fn()
    };

    const renderWithProviders = (authValues) => {
        return render (
            <BrowserRouter>
                <AuthContext.Provider value={authValues}>
                    <TaskContext.Provider value={mockTaskValue}>
                        <Profile/>
                    </TaskContext.Provider>
                </AuthContext.Provider>
            </BrowserRouter>
        )
    };

    it('debe mostrar estado de carga inicial', () => {
        renderWithProviders({loading: true, user: null});

        const loadingText = screen.getByText(/Cargando datos usuario.../i);
        expect(loadingText).toBeInTheDocument();
    });

    it('debe renderizar nombre, email y fecha formateada del usuario', () => {
        const mockUser = {
            name: 'Vania Ibarra',
            email: 'vania@test.com',
            joined_on: '2024-03-15T12:00:00Z'
        };

        renderWithProviders({ loading: false, user: mockUser});
        expect(screen.getByText('Vania Ibarra')).toBeInTheDocument();
        expect(screen.getByText('vania@test.com')).toBeInTheDocument();
        
        expect(screen.getByText(/15\/03\/2024/i)).toBeInTheDocument();

        expect(screen.getByRole('link', {name: /Recordatorios/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /Editar perfil/i})).toBeInTheDocument();

    });
})