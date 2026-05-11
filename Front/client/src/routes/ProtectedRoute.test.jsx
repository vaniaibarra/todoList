import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

describe('Componente ProtectedRoute', () => {
    const renderWithRouter = (authState, initialRoute = '/tasks') => {
        return render(
            <AuthContext.Provider value={authState}>
                <MemoryRouter initialEntries={[initialRoute]}>
                    <Routes>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/tasks" element={<h1>Contenido secreto</h1>}/>
                        </Route>
                        <Route path="/login" element={<h1>Pantalla login</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )
    };

    it('debe mostrar el mensaje de carga cuando loading es true', () => {
       
        renderWithRouter({ isAuthenticated: false, loading: true });

        const loadingText = screen.getByText(/Verificando credenciales/i);
        expect(loadingText).toBeInTheDocument();
    });

    it('debe redirigir al /login si el usuario NO está autenticado', () => {
        
        renderWithRouter({ isAuthenticated: false, loading: false });

        
        const loginScreen = screen.getByText(/Pantalla login/i);
        
        
        expect(loginScreen).toBeInTheDocument();
        
        
        const secretContent = screen.queryByText(/Contenido Secreto/i);
        expect(secretContent).not.toBeInTheDocument();
    });

    it('debe dejar pasar y renderizar el contenido (Outlet) si está autenticado', () => {
       
        renderWithRouter({ isAuthenticated: true, loading: false });

        
        const secretContent = screen.getByText(/Contenido Secreto/i);
        
        expect(secretContent).toBeInTheDocument();
    });
})