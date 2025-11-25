import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Star, Moon, Sun } from 'lucide-react';

const Landing = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center text-center py-20">
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-astro-gold to-astro-accent mb-6">
                    Desvende seu Destino
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-10">
                    AstroSense combina a sabedoria milenar da astrologia com a precisão da Inteligência Artificial para guiar seus passos.
                </p>

                <div className="flex gap-4">
                    <Link to="/register" className="bg-astro-accent hover:bg-white hover:text-astro-main text-astro-dark font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105">
                        Começar Agora (Grátis)
                    </Link>
                    <Link to="/login" className="border border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full text-lg transition">
                        Já tenho conta
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full px-4">
                    <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                        <Sun className="w-12 h-12 text-astro-gold mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Horóscopo Diário</h3>
                        <p className="text-gray-400">Receba previsões diárias personalizadas para o seu signo com 1 crédito grátis todo dia.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                        <Star className="w-12 h-12 text-astro-accent mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">IA Astrológica</h3>
                        <p className="text-gray-400">Faça perguntas específicas sobre amor, carreira e finanças para nossa IA especializada.</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                        <Moon className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2">Compatibilidade</h3>
                        <p className="text-gray-400">Descubra a sinergia entre signos e entenda melhor seus relacionamentos.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Landing;
