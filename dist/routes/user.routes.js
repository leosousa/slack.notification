"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const safeRunner_1 = require("../middlewares/safeRunner");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/', (0, safeRunner_1.SafeRunner)(userController_1.userController.create));
userRoutes.get('/', (0, safeRunner_1.SafeRunner)(userController_1.userController.index));
userRoutes.put('/:idUser', (0, safeRunner_1.SafeRunner)(userController_1.userController.update));
userRoutes.delete('/:idUser', (0, safeRunner_1.SafeRunner)(userController_1.userController.delete));