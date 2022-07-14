import { marketplaceRepository } from "../repositories/marketplaceRepository";

const marketplaceService = {
    list: async () => {
        return await marketplaceRepository.list();
    }
}

export { marketplaceService };