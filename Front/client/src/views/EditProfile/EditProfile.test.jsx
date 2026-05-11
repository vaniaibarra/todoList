import { render, screen } from '@testing-library/react';
import EditProfile from './EditProfile';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';
import { expect, describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Componente EditProfile', () => {

    const mockAuthValue = {
        user: { id: 1, name: 'Vania', email: 'vania@test.com' },
        setUser: () => {}
    };

    const mockProfileValue = {
        formData: { name: 'Vania', email: 'vania@test.com', avatarUrl: '' },
        setFormData: () => {},
        uploadingAvatar: false,
        handleInputChange: () => {},
        handleFileUpload: () => {},
        handleSaveProfile: () => {}
    };

    const renderWithProviders = (component, profileOverrides = {}) => {

        const finalProfileValue = {...mockProfileValue, ...profileOverrides};
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={mockAuthValue}>
                    <ProfileContext.Provider value={finalProfileValue}>
                        {component}
                    </ProfileContext.Provider>
                </AuthContext.Provider>
            </BrowserRouter>
        )
    };

    it('debe renderizar título correctamente', () => {
        renderWithProviders(<EditProfile/>);

        const titleElement = screen.getByText(/Editar perfil/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('debe mostrar los datos del usuario en los inputs al cargar', () => {
        renderWithProviders(<EditProfile/>);

        const nameInput = screen.getByDisplayValue('Vania');
        const emailInput = screen.getByDisplayValue('vania@test.com');

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    });

    it('debe llamar a la función de cambio al escribit en el input', async () => {
        const user = userEvent.setup();

        const spyInputChange = vi.fn();

        renderWithProviders(<EditProfile/>, { handleInputChange: spyInputChange });

        const nameInput = screen.getByDisplayValue('Vania');

        await user.clear(nameInput);
        await user.type(nameInput, 'Vania Nueva');

        expect(spyInputChange).toHaveBeenCalled();
    });

    it('debe guardar los cambios ingresados', async () => {
        const user = userEvent.setup();

        const spySaveProfile = vi.fn();

        renderWithProviders(<EditProfile/>, { handleSaveProfile: spySaveProfile});

        const button = screen.getByRole('button', {name: /Guardar cambios/i})

        await user.click(button);

        expect(spySaveProfile).toHaveBeenCalled();
    })
});