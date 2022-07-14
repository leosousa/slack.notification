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
exports.webhookService = void 0;
const appError_1 = require("../errors/appError");
const webhookRepository_1 = require("../repositories/webhookRepository");
const configService_1 = require("./configService");
const marketplaceService_1 = require("./marketplaceService");
const configEnum_1 = require("../enums/configEnum");
const blingService_1 = require("./blingService");
const slackService_1 = require("./slackService");
const webhookService = {
    list: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield webhookRepository_1.webhookRepository.list();
    }),
    filter: (startOrderDate, endOrderDate) => __awaiter(void 0, void 0, void 0, function* () {
        return yield webhookRepository_1.webhookRepository.filter(startOrderDate, endOrderDate);
    }),
    create: (webhook) => __awaiter(void 0, void 0, void 0, function* () {
        return yield webhookRepository_1.webhookRepository.create(webhook);
    }),
    createMany: (webhooks) => __awaiter(void 0, void 0, void 0, function* () {
        return yield webhookRepository_1.webhookRepository.createMany(webhooks);
    }),
    process: () => __awaiter(void 0, void 0, void 0, function* () {
        // Data de referência
        var currentDateSearch = new Date();
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        var endDate = new Date();
        // Lista configurações
        var configs = yield configService_1.configService.list();
        if (!configs || configs.length <= 0) {
            throw new appError_1.AppError('Config not found', 404);
        }
        // Lista markeplaces
        var marketplaces = yield marketplaceService_1.marketplaceService.list();
        if (!marketplaces || marketplaces.length <= 0) {
            throw new appError_1.AppError('Marketplaces not found', 404);
        }
        // Lista pedidos já salvos
        var saveOrders = yield webhookService.filter(startDate, endDate);
        // console.log('startDate: ', startDate);
        // console.log('endDate: ', endDate);
        // console.log('saveOrders: ', saveOrders.length);
        // Setando configuracoes
        const slackChannel = configService_1.configService.filterById(configs, configEnum_1.configEnum.SLACK_CHANNEL_NAME);
        const slackToken = configService_1.configService.filterById(configs, configEnum_1.configEnum.SLACK_TOKEN);
        const apiBaseUrl = configService_1.configService.filterById(configs, configEnum_1.configEnum.API_BASE_URL);
        const blingApiUrl = configService_1.configService.filterById(configs, configEnum_1.configEnum.BLING_API_URL);
        const blingApiKey = configService_1.configService.filterById(configs, configEnum_1.configEnum.BLING_API_KEY);
        // Busca ultimos pedidos no Bling
        var blingService = new blingService_1.BlingService(blingApiUrl.value, blingApiKey.value);
        var blingLastOrders = yield blingService.getLastOrders(endDate);
        // Verifica se tem pedido no Bling
        if (!blingLastOrders || blingLastOrders.length <= 0) {
            return [];
        }
        // Verifica se pedidos já estão cadastrados no banco
        let webhooksToCreate = [];
        let saveAlreadyOrder = [];
        blingLastOrders.forEach((blingLastOrder) => {
            saveAlreadyOrder = saveOrders.filter((elem) => elem.order_number == blingLastOrder.pedido.numero);
            if (!saveAlreadyOrder || saveAlreadyOrder.length <= 0) {
                let data = {
                    order_number: blingLastOrder.pedido.numero,
                    order_date: new Date(blingLastOrder.pedido.data),
                    data: JSON.stringify(blingLastOrder),
                    sended: true,
                };
                webhooksToCreate.push(data);
            }
        });
        // Verifica se tem novos webhooks para cadastro
        if (webhooksToCreate.length <= 0) {
            return [];
        }
        // Cadastra os novos webhooks no banco
        // var registeredWebhooks = await webhookService.createMany(webhooksToCreate);
        var registeredWebhooks = [];
        for (var index = 0; index <= webhooksToCreate.length - 1; index++) {
            const webhookAdicionado = yield webhookService.create(webhooksToCreate[index]);
            registeredWebhooks.push(webhookAdicionado);
        }
        // Verifica se os webhooks foram cadastrados
        if (!registeredWebhooks || registeredWebhooks.length <= 0) {
            throw new appError_1.AppError('Webhooks not registered', 500);
        }
        // Envia para o slack os novos webhooks
        var slackService = new slackService_1.SlackService(slackChannel.value, slackToken.value, marketplaces);
        for (var index = 0; index <= registeredWebhooks.length - 1; index++) {
            var response = yield slackService.sendOrder(registeredWebhooks[index]);
            console.log('response.status: ', response.status);
            // Pause utilizado para atualização do canal do Slack item a item, para evitar que o pedido não
            // apareça no canal devido a quantidade de mensagens enviadas simultaneamente
            yield timeSleep();
        }
        return registeredWebhooks;
    })
};
exports.webhookService = webhookService;
function timeSleep() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("inicio de pausa");
        yield sleep(2000);
        console.log("fim de pausa");
    });
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
