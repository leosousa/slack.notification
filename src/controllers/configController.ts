import { Request, Response } from 'express';
import { configService } from "../services/configService";

const configController = {
    list: async (request: Request, response: Response) => {
        const configs = await configService.list();
        console.log('configs: ', configs);

        if (!configs || configs.length <= 0) {
            return response.status(404).json({
                success: true,
                data: null,
                message: "Nenhuma configuração encontrada",
            });
        }

        return response.status(200).json({
            success: true,
            data: configs,
            message: "Configurações encontradas"
        });
    }
}

export { configController };