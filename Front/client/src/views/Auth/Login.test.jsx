import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Login from './Login';

describe('Componente Login', () => {

    const mockAuthValues = {
        signin: vi.fn(),
        errors: []
    };

    const renderWithComponent = (authValues = mockAuthValues) => {
        
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={authValues}>
                    <Login/>
                </AuthContext.Provider>
            </BrowserRouter>
        )
    }

    it('debe renderizar campos email, contraseña y botón', () => {
        renderWithComponent();

        const inputEmail = screen.getByPlaceholderText(/user@mail.com/i);
        const inputPassword = screen.getByPlaceholderText('******');

        const button = screen.getByRole('button', {name: /Ingresar/i});

        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('debe mostrar mensaje de error al enviar formulario vacío', async () => {
        const user = userEvent.setup();

        renderWithComponent();

        const button = screen.getByRole('button', {name: /Ingresar/i});
        await user.click(button);

        const emailError = await screen.findByText(/El correo es obligatorio/i);
        const passwordError = await screen.findByText(/La contraseña es obligatoria/i);

        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();

    });

    it('debe llamar a función signin al enviar credenciales válidas', async () => {
        const user = userEvent.setup();
        const spySingin = vi.fn();

        renderWithComponent({signin: spySingin, errors: []});

        const inputEmail = screen.getByPlaceholderText(/user@mail.com/i);
        const inputPassword = screen.getByPlaceholderText('******');

        const button = screen.getByRole('button', {name: /Ingresar/i});

        await user.type(inputEmail, 'vania@test.com');
        await user.type(inputPassword, 'PasswordSegura123');

        await user.click(button);
        
        expect(spySingin).toHaveBeenCalled();
        
    });

})
