"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRoutes = void 0;
const express_1 = require("express");
const webhookController_1 = require("../controllers/webhookController");
const safeRunner_1 = require("../middlewares/safeRunner");
const webhookRoutes = (0, express_1.Router)();
exports.webhookRoutes = webhookRoutes;
webhookRoutes.get('/', (0, safeRunner_1.SafeRunner)(webhookController_1.webhookController.list));
webhookRoutes.get('/process', (0, safeRunner_1.SafeRunner)(webhookController_1.webhookController.process));
webhookRoutes.get('/test', (0, safeRunner_1.SafeRunner)(webhookController_1.webhookController.test));
