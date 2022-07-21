import { AppError } from "../errors/appError";
import { webhookRepository } from "../repositories/webhookRepository";
import { configService } from "./configService";
import { marketplaceService } from "./marketplaceService";
import { configEnum } from "../enums/configEnum";
import { BlingService } from "./blingService";
import { Webhook } from ".prisma/client";
import { SlackService } from "./slackService";

const webhookService = {
    list: async () => {
        return await webhookRepository.list();
    },
    filter: async (startOrderDate: Date, endOrderDate: Date) => {
      return await webhookRepository.filter(startOrderDate, endOrderDate);
    },
    create: async (webhook: Webhook) => {
        return await webhookRepository.create(webhook);
    },
    createMany: async (webhooks: Webhook[]) => {
        return await webhookRepository.createMany(webhooks);
    },
    process: async () => {
        // Data de referência
        var currentDateSearch = new Date();
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        var endDate = new Date();

        // Lista configurações
        var configs = await configService.list();
        if (!configs || configs.length <= 0) {
            throw new AppError('Config not found', 404);
        }

        // Lista markeplaces
        var marketplaces = await marketplaceService.list();
        if (!marketplaces || marketplaces.length <= 0) {
            throw new AppError('Marketplaces not found', 404);
        }

        // Lista pedidos já salvos
        var saveOrders = await webhookService.filter(startDate, endDate);
        // console.log('startDate: ', startDate);
        // console.log('endDate: ', endDate);
        // console.log('saveOrders: ', saveOrders.length);

        // Setando configuracoes
        const slackChannel = configService.filterById(configs, configEnum.SLACK_CHANNEL_NAME);
        const slackToken = configService.filterById(configs, configEnum.SLACK_TOKEN);
        const apiBaseUrl = configService.filterById(configs,  configEnum.API_BASE_URL);
        const blingApiUrl = configService.filterById(configs, configEnum.BLING_API_URL);
        const blingApiKey = configService.filterById(configs, configEnum.BLING_API_KEY);

        // Busca ultimos pedidos no Bling
        var blingService = new BlingService(blingApiUrl!.value, blingApiKey!.value);
        var blingLastOrders = await blingService.getLastOrders(endDate);

        // Verifica se tem pedido no Bling
        if (!blingLastOrders || blingLastOrders.length <= 0) {
            return [];
        }

        // Verifica se pedidos já estão cadastrados no banco
        let webhooksToCreate: Webhook[] = [];
        let saveAlreadyOrder = [];
        blingLastOrders.forEach((blingLastOrder: any) => {
            saveAlreadyOrder = saveOrders.filter((elem) => 
                elem.order_number == blingLastOrder.pedido.numero
            );

            if(!saveAlreadyOrder || saveAlreadyOrder.length <= 0) 
            { 
                let data = {
                    order_number: blingLastOrder.pedido.numero,
                    order_date: new Date(blingLastOrder.pedido.data),
                    data: JSON.stringify(blingLastOrder),
                    sended: true,
                };

                webhooksToCreate.push(data as Webhook);
            }

        });

        // Verifica se tem novos webhooks para cadastro
        if (webhooksToCreate.length <= 0) {
            return [];
        }

        // Cadastra os novos webhooks no banco
        // var registeredWebhooks = await webhookService.createMany(webhooksToCreate);
        var registeredWebhooks: Webhook[] = [];
        for (var index = 0; index <= webhooksToCreate.length-1; index++) {
            const webhookAdicionado = await webhookService.create(webhooksToCreate[index]);
            registeredWebhooks.push(webhookAdicionado);
        }

        // Verifica se os webhooks foram cadastrados
        if (!registeredWebhooks || registeredWebhooks.length <= 0) {
            throw new AppError('Webhooks not registered', 500); 
        }

        // Envia para o slack os novos webhooks
        var slackService = new SlackService(slackChannel!.value, slackToken!.value, marketplaces);
        for (var index = 0; index <= registeredWebhooks.length-1; index++) {
            var response = await slackService.sendOrder(registeredWebhooks[index]);
            console.log('response.status: ', response.status);

            // Pause utilizado para atualização do canal do Slack item a item, para evitar que o pedido não
            // apareça no canal devido a quantidade de mensagens enviadas simultaneamente
            // await timeSleep();
        }

        return registeredWebhooks;
    },
    test: async () => {
        // Lista configurações
        var configs = await configService.list();
        if (!configs || configs.length <= 0) {
            throw new AppError('Config not found', 404);
        }

        // Lista markeplaces
        var marketplaces = await marketplaceService.list();
        if (!marketplaces || marketplaces.length <= 0) {
            throw new AppError('Marketplaces not found', 404);
        }

         // Setando configuracoes
         const slackChannel = configService.filterById(configs, configEnum.SLACK_CHANNEL_NAME);
         const slackToken = configService.filterById(configs, configEnum.SLACK_TOKEN);

        var slackService = new SlackService(slackChannel!.value, slackToken!.value, marketplaces);
        var response = await slackService.sendTest();

        return (response.status === 200);
    }
}

async function timeSleep() {
    console.log("inicio de pausa");
    await sleep(2000);
    console.log("fim de pausa");
}

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export { webhookService };