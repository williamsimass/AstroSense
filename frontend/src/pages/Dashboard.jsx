import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../services/api';
import { Star, Zap, MessageCircle, Heart } from 'lucide-react';

const Dashboard = () => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [customQuestion, setCustomQuestion] = useState('');

    const handleQuery = async (type, data = {}) => {
        setLoading(true);
        setResult(null);
        try {
            const response = await api.post('/horoscope/query', { type, ...data });
            setResult(response.data);
            // Refresh user to update credits
            const userRes = await api.get('/auth/me');
            setUser(userRes.data);
        } catch (error) {
            alert(error.response?.data?.error || 'Erro na consulta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
                    <div>
                        <h1 className="text-3xl font-bold text-astro-gold">Olá, {user.name}</h1>
                        <p className="text-gray-400">Signo: <span className="text-white font-bold">{user.sign}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Seus Créditos</p>
                        <p className="text-4xl font-bold text-astro-accent">{user.credit?.balance || 0}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <button
                        onClick={() => handleQuery('daily', { sign: user.sign })}
                        disabled={loading}
                        className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-2xl border border-white/10 hover:border-astro-gold transition text-left group"
                    >
                        <Star className="w-8 h-8 text-astro-gold mb-4 group-hover:scale-110 transition" />
                        <h3 className="text-xl font-bold mb-2">Horóscopo de Hoje</h3>
                        <p className="text-sm text-gray-400">Consulte as previsões para amor, trabalho e saúde.</p>
                    </button>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <MessageCircle className="w-8 h-8 text-astro-accent mb-4" />
                        <h3 className="text-xl font-bold mb-2">Pergunta à IA</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Ex: Vou ter sorte no amor?"
                                className="flex-1 bg-black/30 border border-white/20 rounded p-2 text-sm text-white"
                                value={customQuestion}
                                onChange={(e) => setCustomQuestion(e.target.value)}
                            />
                            <button
                                onClick={() => handleQuery('custom', { question: customQuestion })}
                                disabled={loading || !customQuestion}
                                className="bg-astro-accent text-astro-dark font-bold px-4 rounded hover:bg-white transition disabled:opacity-50"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-10">
                        <div className="animate-spin w-10 h-10 border-4 border-astro-gold border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p>Consultando os astros...</p>
                    </div>
                )}

                {result && (
                    <div className="bg-white/10 p-8 rounded-2xl border border-astro-gold/50 animate-fade-in">
                        <h3 className="text-2xl font-bold text-astro-gold mb-4">Resposta dos Astros</h3>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">{result.response}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
