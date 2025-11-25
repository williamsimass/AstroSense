import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Star, CreditCard, History } from 'lucide-react';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-astro-dark text-white font-sans flex flex-col">
            <nav className="bg-astro-main p-4 shadow-lg border-b border-white/10">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-astro-gold flex items-center gap-2">
                        <Star className="w-6 h-6" /> AstroSense
                    </Link>
                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="hover:text-astro-accent flex items-center gap-1"><User size={18} /> Dashboard</Link>
                                <Link to="/credits" className="hover:text-astro-accent flex items-center gap-1"><CreditCard size={18} /> Créditos</Link>
                                <Link to="/history" className="hover:text-astro-accent flex items-center gap-1"><History size={18} /> Histórico</Link>
                                <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-400">
                                    <LogOut size={18} /> Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-astro-accent">Entrar</Link>
                                <Link to="/register" className="bg-astro-accent text-astro-dark px-4 py-2 rounded-full font-bold hover:bg-white transition">Criar Conta</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <main className="flex-grow container mx-auto p-4 py-8">
                {children}
            </main>
            <footer className="bg-astro-main p-6 text-center text-gray-400 text-sm">
                © 2024 AstroSense. Todos os direitos reservados.
            </footer>
        </div>
    );
};

export default Layout;
