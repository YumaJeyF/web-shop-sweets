import axios from 'axios';

export const updateNumberPopularSets = async (id: number, currentNumber: number) => {
    const url: string = `http://localhost:4200/sets/${id}`;

    const response = await axios.patch(url, { numberOfViews: currentNumber + 1 });


    if (response.statusText !== 'OK') throw new Error(`Возникла ошибка при попытке обновления данных о популярности товара, статус ошибки: ${response.status}`);
}