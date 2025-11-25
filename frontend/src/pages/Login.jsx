import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-10 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-astro-gold">Entrar</h2>
                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/30 border border-white/20 rounded p-3 text-white focus:border-astro-accent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/30 border border-white/20 rounded p-3 text-white focus:border-astro-accent outline-none"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-astro-main hover:bg-astro-accent hover:text-astro-dark border border-astro-accent text-white font-bold py-3 rounded transition">
                        Acessar
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Não tem conta? <Link to="/register" className="text-astro-gold hover:underline">Cadastre-se</Link>
                </p>
            </div>
        </Layout>
    );
};

export default Login;
