import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

interface IUser {
    id: string;
    name: string;
    login: string;
}

const users: IUser[] = [];

const userController = {
    index: (request: Request, response: Response) => {
        response.json(users);
    },
    create: (request: Request, response: Response) => {
        const { name, login } = request.body;
        const usuario: IUser = { id: uuid(), name, login };

        users.push(usuario);

        response.json(usuario);
    },
    update: (request: Request, response: Response) => {
        const { idUser } = request.params;
        const { name, login } = request.body;

        console.log('idUser: ', idUser);

        const indexUser = users.findIndex((usuario) => usuario.id == idUser);

        users[indexUser] = { ...users[indexUser], name, login };

        response.json(users[indexUser]);
    },
    delete: (request: Request, response: Response) => {
        response.send('Esse é um delete');
    }
}

export { userController };