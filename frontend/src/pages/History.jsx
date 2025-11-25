import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const History = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/horoscope/history');
                setQueries(response.data);
            } catch (error) {
                console.error('Erro ao buscar histórico');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-astro-gold mb-8">Histórico de Consultas</h1>

            {loading ? (
                <div className="text-center">Carregando...</div>
            ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                    {queries.length === 0 ? (
                        <p className="text-gray-400 text-center">Nenhuma consulta realizada ainda.</p>
                    ) : (
                        queries.map((query) => (
                            <div key={query.id} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/30 transition">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-astro-main px-3 py-1 rounded-full text-xs uppercase tracking-wider text-astro-accent font-bold">
                                        {query.type === 'daily' ? 'Horóscopo Diário' : query.type === 'custom' ? 'Pergunta Personalizada' : query.type}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(query.createdAt).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                                {query.prompt && <p className="text-sm text-gray-400 mb-2 italic">"{query.prompt}"</p>}
                                <p className="text-gray-200">{query.response}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </Layout>
    );
};

export default History;
