import axios from "axios";

export const getVariantsGifts = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/variantsGifts';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о вариантах подарков, статус ошибки ${response.status}`);
    }
}