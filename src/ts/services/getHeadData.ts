import axios from "axios";

export const getHeadInf = {
    get: async (name: string) => {
        const url: string = `http://localhost:4200/${name}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о '${name}', статус ошибки ${response.status}`);
    }
}