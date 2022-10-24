"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
};
exports.errorMiddleware = errorMiddleware;
