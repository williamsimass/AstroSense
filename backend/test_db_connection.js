require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'astrosense',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: console.log
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database.');
        if (error.original && error.original.code) {
            console.error('Error Code:', error.original.code);
            console.error('Error Message:', error.original.message);
        } else {
            console.error('Error Message:', error.message);
        }
    } finally {
        await sequelize.close();
    }
}

testConnection();
