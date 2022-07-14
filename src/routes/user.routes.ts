import { Router } from 'express';
import { userController } from '../controllers/userController';
import { SafeRunner } from "../middlewares/safeRunner";

const userRoutes = Router();

userRoutes.post('/', SafeRunner(userController.create));
userRoutes.get('/', SafeRunner(userController.index));
userRoutes.put('/:idUser', SafeRunner(userController.update));
userRoutes.delete('/:idUser', SafeRunner(userController.delete));

export { userRoutes }