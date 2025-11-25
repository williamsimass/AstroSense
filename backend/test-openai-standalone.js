const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getDailyHoroscope(sign) {
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
        throw error;
    }
}

async function test() {
    console.log('Testing OpenAI Integration Standalone...');
    try {
        const result = await getDailyHoroscope('Leão');
        console.log('Success! Response:', result.response);
    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

test();
