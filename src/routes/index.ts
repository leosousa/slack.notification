import { Router } from 'express';
import { userRoutes } from './user.routes';
import { configRoutes } from './config.routes';
import { marketplaceRoutes } from './marketplace.routes';
import { webhookRoutes } from './webhook.routes';

const app = Router();

app.use('/users', userRoutes);
app.use('/configs', configRoutes);
app.use('/marketplaces', marketplaceRoutes);
app.use('/webhooks', webhookRoutes);

export { app };