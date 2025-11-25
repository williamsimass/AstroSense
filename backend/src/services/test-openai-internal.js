const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Mock models
const mockModels = {
    HoroscopeQuery: {
        create: () => Promise.resolve()
    },
    Credit: {}
};

try {
    const modelsPath = require.resolve('../models');
    console.log('Models resolved to:', modelsPath);
    require.cache[modelsPath] = {
        exports: mockModels
    };
} catch (e) {
    console.error('Failed to resolve models:', e.message);
}

try {
    const creditServicePath = require.resolve('./creditService');
    console.log('CreditService resolved to:', creditServicePath);
    require.cache[creditServicePath] = {
        exports: {
            consumeCredit: () => Promise.resolve(true)
        }
    };
} catch (e) {
    console.error('Failed to resolve CreditService:', e.message);
}

let HoroscopeService;
try {
    HoroscopeService = require('./horoscopeService');
    console.log('HoroscopeService loaded successfully');
} catch (e) {
    console.error('Failed to load HoroscopeService:', e);
}

async function testOpenAI() {
    console.log('Testing Daily Horoscope...');
    try {
        const daily = await HoroscopeService.getDailyHoroscope({ sign: 'Leão' }, 'Leão');
        console.log('Daily Response:', daily.response);
    } catch (error) {
        console.error('Daily Error:', error);
    }

    console.log('\nTesting Compatibility...');
    try {
        const compatibility = await HoroscopeService.getCompatibility('Áries', 'Libra');
        console.log('Compatibility Response:', compatibility.response);
    } catch (error) {
        console.error('Compatibility Error:', error);
    }

    console.log('\nTesting Custom Question...');
    try {
        const custom = await HoroscopeService.askCustomQuestion({ sign: 'Peixes' }, 'Vou ficar rico esse ano?');
        console.log('Custom Response:', custom.response);
    } catch (error) {
        console.error('Custom Error:', error);
    }
}

testOpenAI();
