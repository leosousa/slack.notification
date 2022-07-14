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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configEnum_1 = require("./enums/configEnum");
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const configService_1 = require("./services/configService");
const webhookService_1 = require("./services/webhookService");
const process_1 = require("process");
const app = (0, express_1.default)();
const config = configService_1.configService.getById(configEnum_1.configEnum.CRON_EXECUTION_TIME).then(config => {
    if (!config) {
        console.log("Tempo de execução não configurado");
        process_1.exit;
    }
    node_cron_1.default.schedule(config.value, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("*******************************************************");
        console.log("Robô de busca de pedidos do Bling e envio para o Slack");
        console.log("*******************************************************");
        console.log("Executando a tarefa de acordo com a configuracao: ", config.value);
        console.log("Iniciando execução em ", new Date());
        const processedWebhooks = yield webhookService_1.webhookService.process();
        console.log("Webhooks processados: ", processedWebhooks.length);
        console.log("*******************************************************\n\n\n\n");
    }));
});
app.listen(1313);
