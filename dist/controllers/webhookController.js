"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookController = void 0;
const webhookService_1 = require("../services/webhookService");
const webhookController = {
    list: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const webhooks = yield webhookService_1.webhookService.list();
        console.log('webhooks: ', webhooks);
        if (!webhooks || webhooks.length <= 0) {
            return response.status(404).json({
                success: true,
                data: null,
                message: "Nenhum webhook encontrado",
            });
        }
        return response.status(200).json({
            success: true,
            data: webhooks,
            message: "Webhooks encontrados"
        });
    }),
    process: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const processedWebhooks = yield webhookService_1.webhookService.process();
        if (!processedWebhooks || processedWebhooks.length <= 0) {
            return response.status(404).json({
                success: true,
                data: null,
                message: "Nenhum webhook processado",
            });
        }
        return response.status(200).json({
            success: true,
            data: processedWebhooks,
            message: "Webhooks processados"
        });
    })
};
exports.webhookController = webhookController;
