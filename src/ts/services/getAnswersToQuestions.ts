import axios from "axios";

export const getAnswersToQuestions = {
    getByName: async (name: string) => {
        const url: string = `http://localhost:4200/${name}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получения данных для секции 'Ответы на вопросы', статус ошибки ${response.status}`);
    }
}