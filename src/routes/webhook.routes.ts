import { Router } from "express";
import { webhookController } from "../controllers/webhookController";
import { SafeRunner } from "../middlewares/safeRunner";

const webhookRoutes = Router();

webhookRoutes.get('/', SafeRunner(webhookController.list));
webhookRoutes.get('/process', SafeRunner(webhookController.process));

export { webhookRoutes }