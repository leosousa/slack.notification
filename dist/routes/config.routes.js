"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configRoutes = void 0;
const express_1 = require("express");
const configController_1 = require("../controllers/configController");
const safeRunner_1 = require("../middlewares/safeRunner");
const configRoutes = (0, express_1.Router)();
exports.configRoutes = configRoutes;
configRoutes.get('/', (0, safeRunner_1.SafeRunner)(configController_1.configController.list));
