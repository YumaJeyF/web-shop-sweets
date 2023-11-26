import axios from "axios";
import { IUser } from "../types";

export const patchNewPassword = async (personalId: string, password: string) => {
    const url: string = `http://localhost:4200/users?personalId=${personalId}`;

    const response = await axios.patch(url, [{
        password: password   
    }]);

    if (response.statusText !== 'OK') throw new Error(`Возникла ошибка при попытке обновить пароль пользователя, статус ошибки: ${response.status}`);
}