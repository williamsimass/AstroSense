import { useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { Check } from 'lucide-react';

const Credits = () => {
    const [loading, setLoading] = useState(false);

    const handleBuy = async (packageId) => {
        setLoading(true);
        try {
            const response = await api.post('/payment/create', { packageId });
            // In a real app, redirect to response.data.checkoutUrl
            // Here we simulate the payment flow
            const { transactionId } = response.data;

            // Simulate user paying
            if (confirm(`Simular pagamento de R$ ${response.data.price}?`)) {
                await api.get(`/payment/mock-checkout/${transactionId}`);
                alert('Pagamento confirmado! Créditos adicionados.');
                window.location.reload();
            }
        } catch (error) {
            alert('Erro ao iniciar compra');
        } finally {
            setLoading(false);
        }
    };

    const plans = [
        { id: 'small', credits: 5, price: '9,90', name: 'Iniciante' },
        { id: 'medium', credits: 15, price: '24,90', name: 'Astrólogo', popular: true },
        { id: 'large', credits: 50, price: '69,90', name: 'Místico' },
    ];

    return (
        <Layout>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-astro-gold mb-4">Adquira Créditos</h1>
                <p className="text-gray-400">Invista no seu autoconhecimento com nossos pacotes especiais.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
                {plans.map((plan) => (
                    <div key={plan.id} className={`relative bg-white/5 rounded-2xl p-8 border ${plan.popular ? 'border-astro-gold scale-105 shadow-xl shadow-astro-gold/20' : 'border-white/10'} flex flex-col`}>
                        {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-astro-gold text-astro-dark font-bold px-4 py-1 rounded-full text-sm">Mais Popular</div>}
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-4xl font-bold text-white mb-6">R$ {plan.price}</div>
                        <ul className="space-y-3 mb-8 flex-1 text-left">
                            <li className="flex items-center gap-2 text-gray-300"><Check size={16} className="text-green-400" /> {plan.credits} Créditos</li>
                            <li className="flex items-center gap-2 text-gray-300"><Check size={16} className="text-green-400" /> Acesso vitalício aos créditos</li>
                            <li className="flex items-center gap-2 text-gray-300"><Check size={16} className="text-green-400" /> Suporte prioritário</li>
                        </ul>
                        <button
                            onClick={() => handleBuy(plan.id)}
                            disabled={loading}
                            className={`w-full py-3 rounded-xl font-bold transition ${plan.popular ? 'bg-astro-gold text-astro-dark hover:bg-white' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            Comprar Agora
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Credits;
