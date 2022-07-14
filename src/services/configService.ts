import { Config } from "@prisma/client";
import { config } from "process";
import { configRepository } from "../repositories/configRepository";

const configService = {
    list: async () => {
        return await configRepository.list();
    },
    filterById: (array: Config[], id: number) => {
        const _configs = array.filter(o =>
            Object.keys(o).some(k => o.id == id));

        if (!_configs || _configs.length <= 0) {
            return null;
        }

        return _configs[0];
    },
    getById: (id: number) => {
        return configRepository.filterById(id);
    }
}

export { configService };