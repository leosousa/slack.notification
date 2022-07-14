import axios from "axios";
import { AnyRecord } from "dns";
import { AppError } from "../errors/appError";

class BlingService {
    constructor(
        public readonly blingApiUrl: string,
        public readonly blingApiKey: string
    ) {}

    public async getLastOrders(referenceDate: Date) {
        const formatter = new Intl.DateTimeFormat('pt-BR');

        const formatDate = formatter.format(referenceDate);

        const blingUrl = this.blingApiUrl + '?apikey=' + this.blingApiKey + '&filters=dataEmissao[' + formatDate + ' TO ' + formatDate + ']'; 

        var response = await axios.get(blingUrl);

        if (response.status != 200) {
            throw new AppError(response.data, response.status);
        }
        
        return response.data.retorno.pedidos;
    }
}

export { BlingService };