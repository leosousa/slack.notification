import { Request, Response } from 'express';
import { marketplaceService } from "../services/marketplaceService";

const marketplaceController = {
    list: async (request: Request, response: Response) => {
        const marketplaces = await marketplaceService.list();
        console.log('marketplaces: ', marketplaces);

        if (!marketplaces || marketplaces.length <= 0) {
            return response.status(404).json({
                success: true,
                data: null,
                message: "Nenhum marketplace encontrado",
            });
        }

        return response.status(200).json({
            success: true,
            data: marketplaces,
            message: "Marketplace encontrados"
        });
    }
}

export { marketplaceController };