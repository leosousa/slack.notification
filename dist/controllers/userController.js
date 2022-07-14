"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const uuid_1 = require("uuid");
const users = [];
const userController = {
    index: (request, response) => {
        response.json(users);
    },
    create: (request, response) => {
        const { name, login } = request.body;
        const usuario = { id: (0, uuid_1.v4)(), name, login };
        users.push(usuario);
        response.json(usuario);
    },
    update: (request, response) => {
        const { idUser } = request.params;
        const { name, login } = request.body;
        console.log('idUser: ', idUser);
        const indexUser = users.findIndex((usuario) => usuario.id == idUser);
        users[indexUser] = Object.assign(Object.assign({}, users[indexUser]), { name, login });
        response.json(users[indexUser]);
    },
    delete: (request, response) => {
        response.send('Esse é um delete');
    }
};
exports.userController = userController;
