import axios from "axios";

export const getDessertData = {
    getDecorationDessertLinks: async () => {
        const url: string = 'http://localhost:4200/decorationCatalogDessertLinks';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возник ошибка при попытке получить данные для стилизации ссылок в каталоге десертов, статус ошибки ${response.status}`);
    }
}