import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

export interface IUserStorage {
    isLogin: boolean
    textNotify: string
    userId: string
    nameForm: string
    quantityUsers: number
    isNextPage: boolean
    userFoundId: string
    btnDisRecPass: boolean
    confirmChange: boolean
}

const initialState: IUserStorage = {
    isLogin: secureLocalStorage.getItem('userId') ? true : false,
    textNotify: '',
    userId: secureLocalStorage.getItem('userId') ? JSON.parse(String(secureLocalStorage.getItem('userId'))): '',
    nameForm: sessionStorage.getItem('nameForm') ? JSON.parse(String(sessionStorage.getItem('nameForm'))) : 'login',
    quantityUsers: 0,
    isNextPage: sessionStorage.getItem('isNextPage') ? JSON.parse(String(sessionStorage.getItem('isNextPage'))) : false,
    userFoundId: secureLocalStorage.getItem('ufi') ? JSON.parse(String(secureLocalStorage.getItem('ufi'))) : '',
    btnDisRecPass: false,
    confirmChange: false
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTextNotify(state, action) {
            state.textNotify = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
            secureLocalStorage.setItem('userId', JSON.stringify(action.payload));
            state.isLogin = true;
        },
        removeUser(state) {
            state.userId = '';
            state.isLogin = false;
            
            if (secureLocalStorage.getItem('userId')) secureLocalStorage.removeItem('userId');
        },
        setNameForm(state, action) {
            state.nameForm = action.payload;
            sessionStorage.setItem('nameForm', JSON.stringify(state.nameForm));
        },
        setQuantityUsers(state, action) {
            state.quantityUsers = action.payload;
        },
        setIsNextPage(state, action) {
            state.isNextPage = action.payload;
            sessionStorage.setItem('isNextPage', JSON.stringify(state.isNextPage));
        },
        setUserFoundId(state, action) {
            state.userFoundId = action.payload;
            secureLocalStorage.setItem('ufi', JSON.stringify(state.userFoundId));
        },
        removeUserFoundId(state, action) {
            state.userFoundId = '';

            if (secureLocalStorage.getItem('ufi') && action.payload) secureLocalStorage.removeItem('ufi');
        },
        setBtnDisRecPass(state, action) {
            state.btnDisRecPass = action.payload;
        },
        setConfirmChange(state, action) {
            state.confirmChange = action.payload;
        }
    }
})


export const { reducer, actions } = user;