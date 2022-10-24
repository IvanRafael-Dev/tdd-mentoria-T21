"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(request, response) {
        this.userService.create(request.body);
        return response.sendStatus(201);
    }
}
exports.UserController = UserController;
