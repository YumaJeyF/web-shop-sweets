import axios from "axios";

export const getFeedbacks = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/feedbacks';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получения данных о отзывах, статус ошибки ${response.status}`);
    }
}