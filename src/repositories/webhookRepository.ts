import { prisma, Webhook } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

const webhookRepository = {
    list: async () => {
        return await prismaClient.webhook.findMany();
    },
    filter: async (startOrderDate: Date, endOrderDate: Date) => {
        return await prismaClient.webhook.findMany({ 
            where: {
                order_date: {
                    gte: startOrderDate,
                    lte: endOrderDate,
                  },
            }
        });
    },
    create: async (data: Webhook) => {
        return await prismaClient.webhook.create({
            data: data
        });
    },
    createMany: async (data: Webhook[]) => {
        return await prismaClient.webhook.createMany({
            data: data
        });
    }
}

export { webhookRepository };