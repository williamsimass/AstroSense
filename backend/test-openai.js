require('dotenv').config();

// Mock models to avoid database connection errors
const mockModels = {
    HoroscopeQuery: {
        create: () => Promise.resolve()
    },
    Credit: {}
};
// We need to mock the path that horoscopeService uses: '../models'
// Since we are running from root, and horoscopeService is in src/services,
// '../models' resolves to 'src/models'.
// We must ensure we mock the absolute path or the one that will be resolved.
const modelsPath = require.resolve('./src/models');
require.cache[modelsPath] = {
    exports: mockModels
};

// Mock CreditService
// We also need to mock CreditService if it has side effects or dependencies
const creditServicePath = require.resolve('./src/services/creditService');
require.cache[creditServicePath] = {
    exports: {
        consumeCredit: () => Promise.resolve(true)
    }
};

const HoroscopeService = require('./src/services/horoscopeService');

async function testOpenAI() {
    console.log('Testing Daily Horoscope...');
    try {
        const daily = await HoroscopeService.getDailyHoroscope({ sign: 'Leão' }, 'Leão');
        console.log('Daily Response:', daily.response);
    } catch (error) {
        console.error('Daily Error:', error.message);
    }

    console.log('\nTesting Compatibility...');
    try {
        const compatibility = await HoroscopeService.getCompatibility('Áries', 'Libra');
        console.log('Compatibility Response:', compatibility.response);
    } catch (error) {
        console.error('Compatibility Error:', error.message);
    }

    console.log('\nTesting Custom Question...');
    try {
        const custom = await HoroscopeService.askCustomQuestion({ sign: 'Peixes' }, 'Vou ficar rico esse ano?');
        console.log('Custom Response:', custom.response);
    } catch (error) {
        console.error('Custom Error:', error.message);
    }
}

testOpenAI();
