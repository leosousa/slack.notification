import { Router } from "express";
import { configController } from "../controllers/configController";
import { SafeRunner } from "../middlewares/safeRunner";

const configRoutes = Router();

configRoutes.get('/', SafeRunner(configController.list));

export { configRoutes }