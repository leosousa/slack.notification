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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
const axios_1 = __importDefault(require("axios"));
class SlackService {
    constructor(slackChannelName, slackToken, marketplaces) {
        this.slackChannelName = slackChannelName;
        this.slackToken = slackToken;
        this.marketplaces = marketplaces;
        this.slackApiUrl = 'https://slack.com/api/chat.postMessage';
    }
    sendOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataJson = JSON.parse(order.data);
            return yield axios_1.default.post(this.slackApiUrl, {
                channel: this.slackChannelName,
                blocks: [
                    {
                        type: "image",
                        image_url: this._getCanalUrl(dataJson.pedido.loja),
                        alt_text: this._getCanal(dataJson.pedido.loja)
                    },
                    {
                        type: 'section',
                        text: { type: 'mrkdwn', text: 'Novo pedido de venda!' },
                        fields: [
                            { type: 'mrkdwn', text: '>*Pedido Bling*\n>' + dataJson.pedido.numero + "\n" },
                            { type: 'mrkdwn', text: '>*Pedido Loja*\n>' + this._getCanal(dataJson.pedido.loja) + "\n" },
                            { type: 'mrkdwn', text: '>*Canal*\n>' + this._getIntermediador(dataJson.pedido.intermediador) + "\n>" },
                            { type: 'mrkdwn', text: '>*Valor total*\n>' + dataJson.pedido.totalvenda + "\n" },
                            { type: 'mrkdwn', text: '>*Valor produtos*\n>' + dataJson.pedido.totalprodutos + "\n>" },
                            { type: 'mrkdwn', text: '>*Valor frete*\n>' + dataJson.pedido.valorfrete + "\n" },
                            { type: 'mrkdwn', text: '>*Produtos*\n>' + this._getItens(dataJson.pedido.itens) },
                        ],
                    }
                ],
                // icon_emoji: ':+1:'
            }, { headers: { authorization: `Bearer ${this.slackToken}` } });
        });
    }
    _getItens(itens) {
        let itemsString = '';
        for (let i = 0; i < itens.length; i++) {
            itemsString = itemsString + "SKU: " + itens[i].item.codigo + "\n>DESCRIÇÃO: " + itens[i].item.descricao + "\n>QTDE: " + itens[i].item.quantidade + "\n>PREÇO: " + itens[i].item.precocusto + "\n\n>";
        }
        return itemsString;
    }
    _getIntermediador(intermediador) {
        if (!intermediador) {
            return '-';
        }
        return intermediador.nomeUsuario;
    }
    _getCanal(canal) {
        var canalEncontrado = this.marketplaces.filter((el) => el.number === canal || el.name === canal);
        if (!canalEncontrado || canalEncontrado.length <= 0) {
            return '-';
        }
        return canalEncontrado[0].name;
    }
    _getCanalUrl(canal) {
        var canalEncontrado = this.marketplaces.filter((el) => el.number === canal || el.name === canal);
        if (!canalEncontrado || canalEncontrado.length <= 0) {
            return '-';
        }
        return "https://raw.githubusercontent.com/leosousa/slack-notification-api/d75c0f484b16a3830520ad15d21d77093be0df7e/api/resources/" + canalEncontrado[0].url;
    }
}
exports.SlackService = SlackService;
