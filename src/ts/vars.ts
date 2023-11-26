import { IVars } from "./types"

export const vars: IVars = {
    body: document.querySelector('body'),
    container: document.querySelector('.container'),
    regEmail: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
    regPhone: /^\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/,
    regPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    regName: /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/
}