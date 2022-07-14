import { Request, Response } from 'express';
import { webhookService } from "../services/webhookService";

const webhookController = {
    list: async (request: Request, response: Response) => {
        const webhooks = await webhookService.list();
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
    },
    process: async (request: Request, response: Response) => {
        const processedWebhooks = await webhookService.process();

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
    }
}

export { webhookController };