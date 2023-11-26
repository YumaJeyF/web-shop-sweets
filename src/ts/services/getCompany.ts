import axios from "axios";

export const getCompany = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/company';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получения данных о компаниях, статус ошибки ${response.status}`);
    }
}