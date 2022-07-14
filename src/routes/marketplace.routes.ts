import { Router } from "express";
import { marketplaceController } from "../controllers/marketplaceController";
import { SafeRunner } from "../middlewares/safeRunner";

const marketplaceRoutes = Router();

marketplaceRoutes.get('/', SafeRunner(marketplaceController.list));

export { marketplaceRoutes }