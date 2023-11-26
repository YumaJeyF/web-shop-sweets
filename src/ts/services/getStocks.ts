import axios from "axios";

export const getStocks = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/stocks';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Ошибка по запросу акиции, статус ${response.status}`);
    }
}