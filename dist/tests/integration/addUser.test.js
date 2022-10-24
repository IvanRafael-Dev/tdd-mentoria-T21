"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app_1 = require("../../api/app");
chai_1.default.use(chai_http_1.default);
// caso de uso: add user
// requerido: email, username, password
describe('POST /users', () => {
    describe('quando o campo "email" não é informado', () => {
        it('deve retornar um status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/users')
                .send({ username: 'any_user', password: 'any_password' });
            (0, chai_1.expect)(httpResponse.status).to.equal(400);
            (0, chai_1.expect)(httpResponse.body).to.deep.equal({ error: 'O campo "email" é obrigatório' });
        }));
    });
    describe('quando o campo "username" não é informado', () => {
        it('deve retornar um status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/users')
                .send({ email: 'any_email@mail.com', password: 'any_password' });
            (0, chai_1.expect)(httpResponse.status).to.equal(400);
            (0, chai_1.expect)(httpResponse.body).to.deep.equal({ error: 'O campo "username" é obrigatório' });
        }));
    });
    describe('quando o campo "password" não é informado', () => {
        it('deve retornar um status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/users')
                .send({ email: 'any_email@mail.com', username: 'any_user' });
            (0, chai_1.expect)(httpResponse.status).to.equal(400);
            (0, chai_1.expect)(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' });
        }));
    });
    describe('quando a requisição é feita com sucesso', () => {
        it('deve retornar um status 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/users')
                .send({ email: 'any_email@mail.com', username: 'any_user', password: 'any_password' });
            (0, chai_1.expect)(httpResponse.status).to.equal(201);
        }));
    });
});
