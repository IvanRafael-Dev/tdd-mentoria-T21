"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const missing_param_error_1 = require("./../errors/missing-param-error");
class UserService {
    create(user) {
        const requiredFields = ['email', 'username', 'password'];
        for (const field of requiredFields) {
            if (!user[field]) {
                throw new missing_param_error_1.MissingParamError(`O campo "${field}" é obrigatório`);
            }
        }
    }
}
exports.UserService = UserService;
