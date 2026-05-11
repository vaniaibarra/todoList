import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from './Register';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { describe, it, expect, vi } from "vitest";

describe('Componente Register', () => {
    const mockAuthValues = {
        signup: vi.fn(),
        errors: []
    };

    const renderWithComponent = (authValues = mockAuthValues) => {
        return render(
            <BrowserRouter>
                <AuthContext.Provider value={authValues}>
                    <Register/>
                </AuthContext.Provider>
            </BrowserRouter>
        )
    };

    it('debe renderizar campos nombre, email, contraseña, confirmar contraseña y botón', () => {
        renderWithComponent();

        const inputNombre = screen.getByPlaceholderText(/Ross Geller/i);
        const inputEmail = screen.getByPlaceholderText(/user@mail.com/i);
        const inputsPassword = screen.getAllByPlaceholderText('******');

        const crearPassword = inputsPassword[0];
        const confirmarPassword = inputsPassword[1];

        const button = screen.getByRole('button', {name: /Crear cuenta/i});

        expect(inputNombre).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
        expect(crearPassword).toBeInTheDocument();
        expect(confirmarPassword).toBeInTheDocument();
        expect(button).toBeInTheDocument();

    });

    it('debe mostrar mensaje de error al enviar formulario vacío', async () => {
        const user = userEvent.setup();

        renderWithComponent();
        const button = screen.getByRole('button', {name: /Crear cuenta/i});

        await user.click(button);

        const nameError = await screen.findByText(/Tu nombre es obligatorio/i);
        const emailError = await screen.findByText(/El correo es obligatorio/i);
        const passwordError = await screen.findByText(/La clave es obligatoria/i);
        const confirmPasswordError = await screen.findByText(/Debes confirmar tu contraseña/i);

        expect(nameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
        expect(confirmPasswordError).toBeInTheDocument();
    });

    it('debe llamar a función signin al enviar credenciales válidas', async () => {
        const user = userEvent.setup();

        const spySignup = vi.fn();

        renderWithComponent({signup: spySignup, errors: []});

        const inputNombre = screen.getByPlaceholderText(/Ross Geller/i);
        const inputEmail = screen.getByPlaceholderText(/user@mail.com/i);
        const inputsPassword = screen.getAllByPlaceholderText('******');

        const crearPassword = inputsPassword[0];
        const confirmarPassword = inputsPassword[1];

        const button = screen.getByRole('button', {name: /Crear cuenta/i});

        await user.type(inputNombre, 'Vania Ibarra');
        await user.type(inputEmail, 'vania@test.com');
        await user.type(crearPassword, 'PasswordSegura123');
        await user.type(confirmarPassword, 'PasswordSegura123');

        await user.click(button);

        expect(spySignup).toHaveBeenCalled();
    });
})