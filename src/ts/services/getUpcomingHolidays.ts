import axios from "axios";

export const getUpcomingHolidays = {
    getAll: async () => {
        const url: string = 'http://localhost:4200/upcomingHolidays';

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Ошибка получения информации о ближайших праздниках, статус ошибки ${response.status}`);
    }
}