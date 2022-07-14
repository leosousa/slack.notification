import { prismaClient } from '../database/prismaClient';

const marketplaceRepository = {
    list: async () => {
        return await prismaClient.marketplace.findMany();
    }
}

export { marketplaceRepository };