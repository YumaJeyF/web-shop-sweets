import axios from "axios";

export const getJudgingCriteria = async () => {
    const url: string = 'http://localhost:4200/judgingCriteria';

    const response = await axios.get(url);

    if (response.statusText === 'OK') return response.data;
    else throw new Error(`Возникла ошибка при попытке получения данных о критериях оценки, статус ошибки: ${response.status}`);
}