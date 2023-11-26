import axios from "axios";

import { IJudgingCriteria } from "../components/screens/probability-to-recommend/first-stage/FirstStage";

export const sendVoice = async (id: number, quantity: number) => {
    const url: string = `http://localhost:4200/judgingCriteria/${id}`;

    const response = await axios.patch(url, { numberOfVotes: quantity++ } as IJudgingCriteria);

    if (response.statusText !== 'OK') throw new Error(`Возникла ошибка при попытке обновить количество голосов у критерия оценивания, статус ошибки: ${response.status}`);
}