"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketplaceRoutes = void 0;
const express_1 = require("express");
const marketplaceController_1 = require("../controllers/marketplaceController");
const safeRunner_1 = require("../middlewares/safeRunner");
const marketplaceRoutes = (0, express_1.Router)();
exports.marketplaceRoutes = marketplaceRoutes;
marketplaceRoutes.get('/', (0, safeRunner_1.SafeRunner)(marketplaceController_1.marketplaceController.list));
