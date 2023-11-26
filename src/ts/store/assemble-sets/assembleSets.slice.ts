import { createSlice, nanoid } from "@reduxjs/toolkit";
import { TastesObj, ObjAdditionally, IQuantity, ISetCart, IOptionSelect } from "../../types";

import secureLocalStorage from "react-secure-storage";


export interface IAssembleSets {
    customImage: string
    dataThemes: IOptionSelect[]
    stageName: string
    nameProduct: string
    quantity: number
    countTastes: number
    customData: ISetCart
    isNextWindow: boolean
}

const initialState: IAssembleSets = {
    stageName: 'quantity',
    isNextWindow: sessionStorage.getItem('isNextWindow') ? true : false,
    customImage: secureLocalStorage.getItem('customImage') ? JSON.parse(String(secureLocalStorage.getItem('customImage'))) : '',
    dataThemes: secureLocalStorage.getItem('dataThemes') ? JSON.parse(String(secureLocalStorage.getItem('dataThemes'))) : [],
    nameProduct: secureLocalStorage.getItem('nameProduct') ? JSON.parse(String(secureLocalStorage.getItem('nameProduct'))) : '',
    quantity: secureLocalStorage.getItem('quantity') ? JSON.parse(String(secureLocalStorage.getItem('quantity'))) : 0,
    countTastes: secureLocalStorage.getItem('countTastes') ? JSON.parse(String(secureLocalStorage.getItem('countTastes'))) : 0,
    customData: secureLocalStorage.getItem('customData') ? JSON.parse(String(secureLocalStorage.getItem('customData'))) : {
        id: 0,
        personalId: '',
        name: '',
        price: 0,
        tastes: [],
        additionally: [],
        count: 1,
        type: '',
        themes: []
    }
}

const changeNameProduct = (state: IAssembleSets) => {
    const parameter: string = initialState.customData.type;

    if (parameter === 'macaroni')  state.nameProduct = 'макарон';
    if (parameter === 'profiteroles') state.nameProduct = 'профитроли';
    if (parameter === 'eclairs') state.nameProduct = 'эклеров';
}

changeNameProduct(initialState);

const assembleSets = createSlice({
    name: 'assembleSets',
    initialState,
    reducers: {
        setStageName(state, action: { payload: string }) {
            state.stageName = action.payload;
        },
        setPrice(state, action: { payload: number }) {
            state.customData.price = action.payload;

            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
        },
        increaseCountTastes(state, action: { payload: string }) {
            const findItem: TastesObj | undefined = state.customData.tastes.find((el: TastesObj) => el.name === action.payload);
 
            if (findItem && state.countTastes < state.quantity) {
                findItem.count++;
                state.countTastes++;
            }
            else if (!findItem && state.countTastes < state.quantity) {
                state.customData.tastes.push({ name: action.payload, count: 1 });
                state.countTastes++;
            }

            secureLocalStorage.setItem('countTastes', JSON.stringify(state.countTastes));
            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
        },
        decreaseCountTastes(state, action: { payload: string }) {
            const findItem: TastesObj | undefined = state.customData.tastes.find((el: TastesObj) => el.name === action.payload);
            
            if (findItem) {
                if (findItem.count > 0 && findItem.count !== 1) findItem.count--;
                else if (findItem.count === 1) state.customData.tastes = state.customData.tastes.filter((el: TastesObj) => el.name !== action.payload);
            
                state.countTastes--;
                secureLocalStorage.setItem('countTastes', JSON.stringify(state.countTastes));
            }

            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
        },
        setDataQuantity(state, action: { payload: { data: IQuantity, isWithPrinting: boolean } }) {
            const { data, isWithPrinting } = action.payload;

            state.quantity = data.quantity;
            state.customData.price = data.price;
            state.customData.type = data.typeProduct;
            state.customData.name = data.name;
            state.customData.personalId = nanoid();

            if (!state.customData.themes.includes('Кастомный')) state.customData.themes.push('Кастомный');
            if (isWithPrinting) {
                state.customData.images = [];
                state.customData.customText = '';
                state.customData.color = '';
                state.customData.fontName = '';
            }

            changeNameProduct(state);

            secureLocalStorage.setItem('nameProduct', JSON.stringify(state.nameProduct));
            secureLocalStorage.setItem('quantity', JSON.stringify(state.quantity));
            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
        },
        deleteTaste(state, action: { payload: string }) {
            const findItem: TastesObj | undefined = state.customData.tastes.find((el: TastesObj) => el.name === action.payload);

            if (findItem) {
                state.customData.tastes = state.customData.tastes.filter((el: TastesObj) => el.name !== findItem.name);
                secureLocalStorage.setItem('customData', JSON.stringify(state.customData));

                state.countTastes -= findItem.count;
                secureLocalStorage.setItem('countTastes', JSON.stringify(state.countTastes));
            }
        },
        removeAllTastes(state) {
            state.customData.tastes = [];
            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
        },
        addParameter(state, action: { payload: { name: string, price: number } }) {
            const findItem: ObjAdditionally | undefined = state.customData.additionally?.find((el: ObjAdditionally) => el.name === action.payload.name);

            if (!findItem && state.customData.additionally) {
                state.customData.additionally.push(action.payload);
                secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
            }
        },
        removeParameter(state, action: { payload: string }) {
            const findItem: ObjAdditionally | undefined = state.customData.additionally?.find((el: ObjAdditionally) => el.name === action.payload);

            if (findItem && state.customData.additionally) {
                state.customData.additionally = state.customData.additionally.filter((el: ObjAdditionally) => el.name !== action.payload);
                secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
            }
        },
        changeTheme(state, action: { payload: IOptionSelect[] }) {
            const newArr: string[] = action.payload.map((el: IOptionSelect) => el.value);

            state.customData.themes = newArr;
            state.dataThemes = action.payload;
            
            if (!state.customData.themes.includes('Кастомный')) state.customData.themes.push('Кастомный');

            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
            secureLocalStorage.setItem('dataThemes', JSON.stringify(state.dataThemes));
        },
        addImage(state, action: { payload: string }) {
            const findImage: string | undefined = state.customData.images?.find((image: string) => image === action.payload);

            if (!findImage && state.customData.images && state.customData.images.length < state.quantity) {
                state.customData.images.push(action.payload);

                secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
            }
        },
        removeImage(state, action: { payload: string }) {
            const findImage: string | undefined = state.customData.images?.find((image: string) => image === action.payload);

            if (findImage && state.customData.images) {
                state.customData.images = state.customData.images.filter((image: string) => image !== findImage);

                secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
            }

        },
        setCustomImage(state, action: { payload: string }) {
            state.customImage = action.payload;
            secureLocalStorage.setItem('customImage', JSON.stringify(state.customImage));
        },
        setDataText(state, action: { payload: { text: string, color: string, fontName: string } }) {
            const { text, color, fontName } = action.payload;

            state.customData.customText = text;
            state.customData.color = color;
            state.customData.fontName = fontName;

            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
        },
        setIsNextWindow(state) {
            state.isNextWindow = true;
            sessionStorage.setItem('isNextWindow', JSON.stringify(true));
        },
        setPersonalId(state, action: { payload: string }) {
            state.customData.personalId = action.payload;
            secureLocalStorage.setItem('customData', JSON.stringify(state.customData));
        },
        removeAllData(state) {

            state.nameProduct = '';
            state.isNextWindow = false;
            state.dataThemes = [];
            state.countTastes = 0;
            state.customImage = '';
            state.customData = {
                id: 0,
                image: '',
                personalId: '',
                price: 0,
                count: 1,
                tastes: [],
                type: '',
                additionally: [],
                name: '',
                themes: []
            }
            state.quantity = 0;
            if (state.customData.images) {
                state.customData.images = [];
                state.customData.customText = '';
                state.customData.color = '';
                state.customData.fontName = '';
            }

            if (secureLocalStorage.getItem('nameProduct')) secureLocalStorage.removeItem('nameProduct');
            if (secureLocalStorage.getItem('quantity')) secureLocalStorage.removeItem('quantity');
            if (secureLocalStorage.getItem('customData')) secureLocalStorage.removeItem('customData');
            if (secureLocalStorage.getItem('countTastes')) secureLocalStorage.removeItem('countTastes');
            if (sessionStorage.getItem('btnBlocked')) sessionStorage.removeItem('btnBlocked');
            if (secureLocalStorage.getItem('dataThemes')) secureLocalStorage.removeItem('dataThemes');
            if (sessionStorage.getItem('assembleSetsResult')) sessionStorage.removeItem('assembleSetsResult');
            if (sessionStorage.getItem('isNextWindow')) sessionStorage.removeItem('isNextWindow');
        }
    }
});

export const { actions, reducer } = assembleSets;