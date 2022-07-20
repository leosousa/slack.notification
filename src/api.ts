import express, { NextFunction, Request, Response } from 'express';
import { ResponseError } from './middlewares/responseError';

import { app as routes } from './routes/index'

const app = express();
app.use(express.json());

app.use((request: Request, response: Response, next: NextFunction) => {
    console.log(`Ip do usuário: ${request.ip}`);

    next();
});

app.use(routes);
app.use(ResponseError);

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor iniciado');
});