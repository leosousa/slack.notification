import { configEnum } from './enums/configEnum';
import express from 'express';
import cron from 'node-cron';
import { configService } from './services/configService';
import { webhookService } from './services/webhookService';
import { exit } from 'process';

const app = express();

const config = configService.getById(configEnum.CRON_EXECUTION_TIME).then(config => {
    if (!config) {
        console.log("Tempo de execução não configurado");
        exit;
    }

    cron.schedule(config!.value, async () => { 
        console.log("*******************************************************");
        console.log("Robô de busca de pedidos do Bling e envio para o Slack");
        console.log("*******************************************************");
        console.log("Executando a tarefa de acordo com a configuracao: ", config!.value);
        console.log("Iniciando execução em ", new Date());
        const processedWebhooks = await webhookService.process();
        console.log("Webhooks processados: ", processedWebhooks.length);
        console.log("*******************************************************\n\n\n\n");
    });
});

app.listen(1313);