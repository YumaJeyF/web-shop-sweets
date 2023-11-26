import axios from "axios";

export const getNews = {
    getAll: async () => {

        const url: string = `http://localhost:4200/news`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Ошибка запроса данных (все новости), статус ошибки ${response.status}`);
    },

    getWithPagination: async (limit: number, page: number, nameFilter: string = '') => {
        let url: string;

        if (nameFilter != 'Все новости') url = `http://localhost:4200/news?_limit=${limit * page}&themes_like=${nameFilter}`;
        else url = `http://localhost:4200/news?_limit=${limit}&_start=0&_end=${page * limit}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response;
        else throw new Error(`Ошибка запроса данных (новости по страницам), статус ошибки ${response.status}`);
    },

    getCurrentNews: async (id: number) => {
        const url: string = `http://localhost:4200/news?id=${id}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data[0];
        else throw new Error(`Ошибка получения данных (новости), id данных: ${id}, статус ошибки ${response.status}`);
    }
        
}