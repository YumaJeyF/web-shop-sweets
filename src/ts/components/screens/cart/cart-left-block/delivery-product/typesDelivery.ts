import { UseFormSetValue, UseFormResetField, UseFormSetError, UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form';

export interface IOptionSelectDelivery {
    value: string,
    label: string
}

export interface IFormDeliveryProduct {
    name: string
    phone: string
    address: string
    message: string
    methodPayment: string
    deliveryMethod: string
    time: string
    date: string
}

export interface IDeliveryMethod {
    idOpen: number,
    setIdOpen: React.Dispatch<React.SetStateAction<number>>,
    setValue: UseFormSetValue<IFormDeliveryProduct>
    resetField: UseFormResetField<IFormDeliveryProduct>,
    changeIsReload: () => void,
    objWatch: IFormDeliveryProduct,
    setError: UseFormSetError<IFormDeliveryProduct>,
    register: UseFormRegister<IFormDeliveryProduct>
}

export type TypeFieldsDelivery = 'yourName' | 'yourTel' | 'yourAddress' | 'yourMessage' | 'methodPayment' | 'deliveryMethod';

export interface IBlockInfMethod {
    idOpen: number
    currentId: number
    changeDeliveryMethod: (id: number, nameField: string, price: number, condition: boolean, errorMessage: string) => void
    srcIcon: string
    nameDelivery: string
    condition: boolean
    errorMessage: string
}

export interface IMainInp {
    register: UseFormRegister<IFormDeliveryProduct>
    errorName: string | undefined
    errorTel: string | undefined
    changeIsReload: () => void
}

export interface ISeparateSelect {
    options: IOptionSelectDelivery[],
    currentInf: string
    setCurrentInf: React.Dispatch<React.SetStateAction<string>>
    onChange: (value: string) => void
    changeIsReload: () => void
}

export interface IComment {
    register: UseFormRegister<IFormDeliveryProduct>,
    error: string | undefined,
    changeIsReload: () => void
}

export interface IAdress extends IComment {
    idOpen: number
}