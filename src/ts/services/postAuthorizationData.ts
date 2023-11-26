import axios from "axios";

import { IUser } from "../types";

export const postAuthorizationData = {
    postRegData: async (data: IUser) => {
        const url: string = `http://localhost:4200/users`;
    
        const response = await axios.post(url, data);

        if (response.statusText !== 'Created') throw new Error(`Возникла ошибка при попытке зарегистрировать пользователя, статус ошибки: ${response.status}`);
    },
}