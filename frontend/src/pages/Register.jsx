import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, birthDate);
            navigate('/dashboard');
        } catch (err) {
            setError('Falha no cadastro. Tente novamente.');
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto mt-10 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-astro-gold">Criar Conta</h2>
                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/30 border border-white/20 rounded p-3 text-white focus:border-astro-accent outline-none"
                            required
                        />
                    </div>
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
                        <label className="block text-sm text-gray-400 mb-1">Data de Nascimento</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
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
                    <button type="submit" className="w-full bg-astro-accent text-astro-dark font-bold py-3 rounded hover:bg-white transition">
                        Cadastrar
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Já tem conta? <Link to="/login" className="text-astro-gold hover:underline">Entrar</Link>
                </p>
            </div>
        </Layout>
    );
};

export default Register;
