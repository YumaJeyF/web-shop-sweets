import axios from "axios";

export const getFreshnessGuarantee = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/freshnessGuarantee';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о гарантии вкуса и качества, статус ошибки ${response.status}`);
    }
}