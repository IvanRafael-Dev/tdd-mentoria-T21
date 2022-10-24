"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = require("./../middleware/errorMiddleware");
const userRouter_1 = require("../routes/userRouter");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get('/', (req, res) => res.status(200).json({ message: 'ok' }));
        this.app.use(userRouter_1.userRouter);
        this.app.use(errorMiddleware_1.errorMiddleware);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
    }
}
exports.App = App;
// app urtilizado pelos tests
exports.app = new App().app;
