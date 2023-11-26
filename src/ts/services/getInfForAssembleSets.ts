import axios from "axios";

export const getInfForAssembleSets = {
    getQuantityByUrl: async (url: string) => {
        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о количестве для создания набора, статус ошибки: ${response.status}`);
    },
    getQuantityById: async (id: number) => {
        const url: string = `http://localhost:4200/assembleSets/${id}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о количестве для создания набора, статус ошибки: ${response.status}`);
    },
    getTastes: async () => {
        const url: string = `http://localhost:4200/tastes`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получит данные о вкусах для создания набора, статус ошибки: ${response.status}`);
    },
    getAdditionally: async () => {
        const url: string = 'http://localhost:4200/additionally';

        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получения данных о дополнительных параметрах для создания набора, статус ошибки: ${response.status} `);
    },
    getImages: async () => {
        const url: string = 'http://localhost:4200/imagesForCustomSet';

        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получения картинок для создания набора, статус ошибки: ${response.status}`);
    }
}