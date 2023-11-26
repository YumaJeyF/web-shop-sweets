import axios from "axios"

export const images = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/images';

        const response = await axios.get(url);

        if (response.status < 400) return response.data;
        else throw new Error('Ошибка запроса');
    }
}