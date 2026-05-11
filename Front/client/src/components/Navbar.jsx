import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="relative bg-white/80 backdrop-blur-md shadow-sm h-20 px-6 flex items-center justify-between font-outfit z-50">
            
            
            <Link to="/tasks" className="text-2xl font-semibold text-[#d57e98]">
                Recordatorios
            </Link>

            
            <ul className="hidden lg:flex items-center gap-6">
                {isAuthenticated ? (
                    <>
                        <li>
                            <span className="text-gray-500 text-sm">Hola, {user?.name}</span>
                        </li>
                        <li>
                            <Link to="/profile" className="text-gray-700 hover:text-[#d57e98] transition-colors">
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-[#d57e98] text-white px-4 py-2 rounded-lg hover:bg-[#c46d87] transition-colors text-sm"
                            >
                                Salir
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="text-gray-700 hover:text-[#d57e98] transition-colors">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-[#d57e98] text-white px-4 py-2 rounded-lg hover:bg-[#c46d87] transition-colors text-sm">
                                Registrarse
                            </Link>
                        </li>
                    </>
                )}
            </ul>

            
            <button
                className="lg:hidden text-[#d57e98] text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            
            {menuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md shadow-md flex flex-col items-center gap-6 py-8 z-9999">
                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-500 text-sm">Hola, {user?.username}</span>
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-[#d57e98] transition-colors text-lg"
                            >
                                Perfil
                            </Link>
                            <button
                                onClick={() => { handleLogout(); setMenuOpen(false); }}
                                className="bg-[#d57e98] text-white px-6 py-2 rounded-lg hover:bg-[#c46d87] transition-colors"
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-gray-700 hover:text-[#d57e98] transition-colors text-lg"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="bg-[#d57e98] text-white px-6 py-2 rounded-lg hover:bg-[#c46d87] transition-colors"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;