"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserService_1 = require("../service/UserService");
const userService = new UserService_1.UserService();
const userController = new UserController_1.UserController(userService);
const router = (0, express_1.Router)();
exports.userRouter = router;
router
    .post('/users', (req, res) => userController.create(req, res));
