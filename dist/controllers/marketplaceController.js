"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketplaceController = void 0;
const marketplaceService_1 = require("../services/marketplaceService");
const marketplaceController = {
    list: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const marketplaces = yield marketplaceService_1.marketplaceService.list();
        console.log('marketplaces: ', marketplaces);
        if (!marketplaces || marketplaces.length <= 0) {
            return response.status(404).json({
                success: true,
                data: null,
                message: "Nenhum marketplace encontrado",
            });
        }
        return response.status(200).json({
            success: true,
            data: marketplaces,
            message: "Marketplace encontrados"
        });
    })
};
exports.marketplaceController = marketplaceController;
