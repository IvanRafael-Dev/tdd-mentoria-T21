"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParamError = void 0;
class InvalidParamError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}
exports.InvalidParamError = InvalidParamError;
