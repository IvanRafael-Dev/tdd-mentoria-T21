"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.STRING,
        allowNull: false
    }
}, {
    sequelize: _1.default,
    modelName: 'users',
    timestamps: false
});
exports.default = User;
