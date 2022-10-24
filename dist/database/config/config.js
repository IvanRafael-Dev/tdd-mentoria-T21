"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: 'tdd_tryber',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'Z'
    },
    logging: false
};
module.exports = config;
