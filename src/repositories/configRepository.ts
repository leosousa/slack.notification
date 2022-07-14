import { prismaClient } from '../database/prismaClient';

const configRepository = {
    list: async () => {
        return await prismaClient.config.findMany();
    },
    filterById: (id: number) => {
        return prismaClient.config.findUnique({
            where: {
                id: id,
            }
        });
    }
}

export { configRepository };