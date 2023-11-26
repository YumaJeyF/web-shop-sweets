import axios from "axios";
import { ISet } from "../types";
import { ISetCart } from "../types";
import { createDataForCart } from "../functions/createDataForCart";

export const getSets = {
    getPopularSets: async ( startRange: number, page: number, limit: number ) => {
        const url: string = `http://localhost:4200/sets?numberOfViews_gte=${startRange}&_page=${page}&_limit=${limit}`;   

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Ошибка, статус ошибки ${response.status}`);
    },
    
    getDataWithPagination: async ( limit: number, page: number, nameFilter: string, nameCatalog: string ) => {
        let url: string = nameFilter != 'Все'
            ?`http://localhost:4200/sets?themes_like=${nameFilter}&_limit=${page * limit}`
            : `http://localhost:4200/sets?_limit=${page * limit}`;
       
        if (nameCatalog != 'all-sets') url = url + `&type=${nameCatalog}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response;
        else throw new Error(`Ошибка при попытке получения данных о готовых наборах, статус ошибки ${response.status}`);
    },

    getCurrentDataById: async (id: number) => {
        const url: string = `http://localhost:4200/sets?id=${id}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data[0];
        else throw new Error(`Не удалось получить информацию о данном наборе, статус ошибки ${response.status}`);
    },

    getYouLike: async (nameThemes: string[], limit: number, id: number, type: string) => {
        let url: string = `http://localhost:4200/sets?`;

        nameThemes.forEach((theme: string, index: number) => {
            if (index + 1 === nameThemes.length) url += `themes_like=${theme}&type=${type}&_limit=${limit}`;
            else url += `themes_like=${theme}&`;
        });

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data.filter((inf: ISet) => inf.id != id);
        else throw new Error(`Возникла ошибка при поппытке получения данных "Вам могут понравиться", статус ошибки ${response.status}`);
    },

    getCheapSets: async (items: ISetCart[]) => {
        const url: string = 'http://localhost:4200/sets?oldPrice_gte=0';

        const response = await axios.get(url);
        
        if (response.statusText == 'OK') {
            const resData: ISet[] = response.data;

            if (resData.length > 0) {
                let cheapSets: ISetCart[] = resData.map((inf: ISet) => createDataForCart(inf, 0));

                if (cheapSets.length > 0 && items.length > 0) {
                    cheapSets.forEach((cheapSet: ISetCart) => {
                        items.forEach((item: ISetCart) => {
                            if (cheapSet.personalId === item.personalId) cheapSets = cheapSets.filter((set: ISetCart) => set.personalId != cheapSet.personalId);
                        });
                    });
                }
    
                const newArr: ISetCart[] = cheapSets.slice(0, 2);

                // setCountLoadCheapSets(newArr.length);

                return newArr;
            }
            else throw new Error(`Возникла ошибка при попытке получить данные "Дешёвые товары, со скидкой для корзины", статус ошибки ${response.status}`);
        }
    },
    
    getSetsWithLimit: async (limit: number) => {
        const url: string = `http://localhost:4200/sets?_limit=${limit}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о наборах, статус ошибки ${response.status}`);
    },

    getComboSetsWithLimit: async (limit: number) => {
        const url: string = `http://localhost:4200/sets?type=combo-set&_limit=${limit}`;

        const response = await axios.get(url);

        if (response.statusText == 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о комбо-наборах, статус ошибки ${response.status}`);
    },

    getByTheme: async (theme: string, limit: number) => {
        const url: string = `http://localhost:4200/sets?theme=${theme}&_limit=${limit}`;

        const response = await axios.get(url);

        if (response.statusText === 'OK') return response.data;
        else throw new Error(`Возникла ошибка при попытке получить данные о наборах (тема: ${theme}), статус ошибки ${response.status}`);
    }
}