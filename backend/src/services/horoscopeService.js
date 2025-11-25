const { HoroscopeQuery, Credit } = require('../models');
const CreditService = require('./creditService');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

class HoroscopeService {
    static async getDailyHoroscope(user, sign) {
        const prompt = `Gere um horóscopo diário para o signo de ${sign}. O tom deve ser místico e encorajador. Foque em amor, trabalho e saúde.`;

        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
            });

            const response = completion.choices[0].message.content;
            return { prompt, response };
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to generate horoscope');
        }
    }

    static async getCompatibility(signA, signB) {
        const prompt = `Analise a compatibilidade amorosa entre ${signA} e ${signB}. Dê uma porcentagem de compatibilidade e explique os pontos fortes e desafios.`;

        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
            });

            const response = completion.choices[0].message.content;
            return { prompt, response };
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to generate compatibility analysis');
        }
    }

    static async askCustomQuestion(user, question) {
        const prompt = `O usuário do signo de ${user.sign} pergunta: "${question}". Responda como um astrólogo experiente, usando o signo da pessoa para contextualizar a resposta.`;

        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
            });

            const response = completion.choices[0].message.content;
            return { prompt, response };
        } catch (error) {
            console.error('OpenAI API Error:', error);
            throw new Error('Failed to answer custom question');
        }
    }

    static async processQuery(userId, type, data) {
        // Check and consume credit
        const success = await CreditService.consumeCredit(userId);
        if (!success) {
            throw new Error('Insufficient credits');
        }

        let result;
        const user = { sign: data.sign || 'Aries' }; // Mock user context if needed, ideally passed from controller

        if (type === 'daily') {
            result = await this.getDailyHoroscope(user, data.sign);
        } else if (type === 'compatibility') {
            result = await this.getCompatibility(data.signA, data.signB);
        } else if (type === 'custom') {
            // Ensure user sign is available for custom questions
            const userContext = data.user || user;
            result = await this.askCustomQuestion(userContext, data.question);
        } else {
            throw new Error('Invalid query type');
        }

        // Save query history
        await HoroscopeQuery.create({
            user_id: userId,
            type,
            prompt: result.prompt,
            response: result.response,
        });

        return result;
    }
}

module.exports = HoroscopeService;
