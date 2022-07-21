import { Marketplace } from ".prisma/client";
import axios from "axios";

class SlackService {
    public readonly slackApiUrl: string = 'https://slack.com/api/chat.postMessage';

    constructor(
        public readonly slackChannelName: string,
        public readonly slackToken: string,
        public readonly marketplaces: Marketplace[]
    ) {}

    public async sendOrder(order: any) {
        const dataJson = JSON.parse(order.data);
        return await axios.post(this.slackApiUrl, {
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
                  { type: 'mrkdwn', text: '>*Canal*\n>' + this._getIntermediador(dataJson.pedido.intermediador) + "\n>"  },
                  { type: 'mrkdwn', text: '>*Valor total*\n>' + dataJson.pedido.totalvenda + "\n" },
                  { type: 'mrkdwn', text: '>*Valor produtos*\n>' + dataJson.pedido.totalprodutos + "\n>" },
                  { type: 'mrkdwn', text: '>*Valor frete*\n>' + dataJson.pedido.valorfrete + "\n" },
                  { type: 'mrkdwn', text: '>*Desconto*\n>' + dataJson.pedido.desconto + "\n" },
                  { type: 'mrkdwn', text: "\n" },
                  { type: 'mrkdwn', text: '>*Produtos*\n>' + this._getItens(dataJson.pedido.itens) },
                ],
              }
            ],
            // icon_emoji: ':+1:'
          }, { headers: { authorization: `Bearer ${this.slackToken}` } })
    }

    _getItens(itens: any) {
        let itemsString = '';
        
        for (let i = 0; i < itens.length; i++) {
            itemsString = itemsString + "SKU: " + itens[i].item.codigo + "\n>DESCRIÇÃO: " + itens[i].item.descricao + "\n>QTDE: " + itens[i].item.quantidade + "\n>PREÇO: " + itens[i].item.precocusto + "\n\n>";
        }
        
        return itemsString;
    }

    _getIntermediador(intermediador: any) {
        // console.log('intermediador: ', intermediador);
        if (intermediador === undefined || intermediador == null) {
            return '-';
        }
        
        return intermediador.nomeUsuario;
    }

    _getCanal(canal: string) {
        var canalEncontrado = this.marketplaces.filter((el) => el.number === canal || el.name === canal);

        if (!canalEncontrado || canalEncontrado.length <= 0) {
            return '-'
        }

        return canalEncontrado[0].name;
    }

    _getCanalUrl(canal: string) {
        var canalEncontrado = this.marketplaces.filter((el) => el.number === canal || el.name === canal);

        if (!canalEncontrado || canalEncontrado.length <= 0) {
            return '-'
        }

        return "https://raw.githubusercontent.com/leosousa/slack.notification/d0d234c05ff3ead526662011c8d571643be3eb86/src/resources/images/" + canalEncontrado[0].url
    }
    
}

export { SlackService };