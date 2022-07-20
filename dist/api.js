"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const responseError_1 = require("./middlewares/responseError");
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((request, response, next) => {
    console.log(`Ip do usuário: ${request.ip}`);
    next();
});
app.use(index_1.app);
app.use(responseError_1.ResponseError);
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor iniciado');
});
