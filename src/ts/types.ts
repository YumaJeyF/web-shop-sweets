import React, { Dispatch, FC, ReactElement, ReactNode, SetStateAction } from "react"
import { IFormDeliveryProduct } from "./components/screens/cart/cart-left-block/delivery-product/typesDelivery"
import { UseFormRegister, RegisterOptions, FieldValues, Path } from "react-hook-form"

export interface IStocks {
    id: number,
    image: string,
    name: string,
    text: string,
    backColorText: string,
    backColorLine: string,
    colorText: string,
    colorTextLine: string,
    appearance: string
}

export interface IHolidays {
    id: number,
    name: string,
    picture: string,
    holidayHat?: string
}

export interface ILoginFields {
    email: string
    password: string
}

export interface ILinkMain {
    id: number
    link: string
    icon: string
    image: string
    name: string
    text: string
}

export interface IUser {
    id?: number
    name: string
    personalId: string
    phoneNumber: string
    email: string
    city: string
    nameCompany: string
    password: string
    cart: ISetCart[]
    promoCodesUsed: IPromo[]
}

export type DataUser = { id: number, userId: number, email: string } 

export interface ISavedUserData {
    nameUser: string
    cart: ISetCart[]
    promocodes: IPromo[]
}

export interface ILoadableImage {
    src: string
    alt?: string
    onLoad?(): void
    isCreateDesign?: boolean
    isCrossed?: boolean
}

export type TastesObj = { name: string, count: number }

export type discount = {
    nameStock: string
    discount: number
}

export interface ISet {
    id: number
    image: string
    personalId: string
    name: string
    numberOfViews: number
    images: string[]
    price: number
    type: string
    text: string
    tastes: TastesObj[]
    description: string[]
    compositionNutritional: string[]
    conditionsAndShelfLife: string[]
    oldPrice?: number
    discounts?: discount[]
    themes: string[]
}

export type ProductInf = ISet[];

export type GiftOptions = {
    name: string,
    price: number
}

export interface INews {
    id: number,
    image: string,
    date: string,
    name: string,
    titleText: string,
    themes: string[],
    texts: string[],
    giftOptions: GiftOptions[],
    images: string[]
}

export interface ISaveParams {
    nameFilter: string,
    page: number
}

export interface IFormFields {
    name: string
    nameCompany: string
    telephone: number | string
    email: string
    comment: string
}

export interface IOptionSets {
    nameFilter: string
    page: number
}

export interface ISetCart {
    id: number
    image: string
    personalId: string
    name: string
    price: number
    tastes: TastesObj[]
    discounts?: discount[]
    additionally?: ObjAdditionally[]
    images?: string[]
    oldPrice?: number
    count: number
    type: string
    themes: string[]
    customText?: string
    color?: string
    fontName?: string
}

export interface IVars {
    body: HTMLBodyElement | null
    container: HTMLDivElement | null
    regEmail: RegExp
    regPhone: RegExp
    regPassword: RegExp
    regName: RegExp
}

export interface ISaveCountProducts {
    id: number
    count: number
}

export interface IFormInput<T extends FieldValues> {
    register: UseFormRegister<T>
    error: string | undefined
    nameReg: Path<T>
    options?: RegisterOptions
    type?: string
    name: string
    id?: string
    value?: string
    placeholder?: string
    onClick?: (e: React.MouseEvent) => void
    errorClass?: string
    className?: string
    onInput?: () => void
}

export interface IPromo {
    name: string
    discount: string
    minPrice: number
}

export interface IFreshnessGuarantee {
    id: number
    image: string
    text: string
}

export interface ICourierDelivery {
    texts: string[]
    imageDesktop: string
    imageMobile?: string
    linkLocationNumber?: number
}

export interface ISelfCallAndPayment {
    textsSelfCall: string[]
    textsPayment: string[]
    image: string
}

export interface IDeliveryPayment {
    courierDelivery: ICourierDelivery
    selfCallAndPayment: ISelfCallAndPayment
}

export type blockContacts = {
    id: number
    name: string
    texts: string[]
}

export interface IContacts {
    dataContacts: blockContacts[]
    image: string
}

export type HeadLink = {
    name: string
    text: string
    image: string
}

export type OtherLinks = {
    id: number
    name: string
    backColor: string
    link: string
    colorName: string
    image: string
}

export interface IDesertLinks {
    headLink: HeadLink
    otherLinks: OtherLinks[]
}

export interface IVariantsGifts {
    id: number
    image: string
    name: string
    text: string
    price: number
}

export interface ICompletedOrder {
    id: number
    image: string
    name: string
}

export interface ICompany {
    id: number
    image: string
    name: string
}

export type TQuestion = {
    id: number
    title: string
    text: string
}

export type ArrQuestion = TQuestion[];

export interface IHead {
    title: string
    firstInf: string
    secondInf: string[]
    pictures: {
        image: string
        backgroundDesktop: string
    }
}

export interface IWeCanOffer {
    id: number
    text: string
    icon: string
}

export interface IFeedbacks {
    id: number
    title: string
    text: string
    nameCustomer: string
    workingPosition: string
    icon: string
}

export type ArrFeedbacks = IFeedbacks[];

export interface IFieldsCorporateGifts {
    name: string
    phone: number
    company: string
    email: string
    comment?: string
}

export type Error = string | undefined;

export interface IErrorsMessages {
    errName: Error,
    errPhone: Error,
    errCompany: Error,
    errEmail: Error
}

export type FormOpen = {
    id: number,
    windowScroll: number
}

export type ClassTextarea = {
    textarea: string,
    parentBlock: string
}

export interface IForm {
    closeModal?: () => void,
    classForBtnClose?: {
        btn: string,
        path: string
    }
    isVisible?: boolean,
    classNameForm?: string,
    classNameBlock?: string,
    classFields?: string,
    classTextarea?: ClassTextarea,
    classTitle?: string,
    classBtnSubmit?: string,
    nameSaveScroll: string
}

export type ErrorsMessagesForm = {
    name: string | undefined,
    telephone: string | undefined,
    nameCompany: string | undefined,
    email: string | undefined,
    comment: string | undefined,
}

export interface IFieldsFormIdeas {
    name: string,
    telephone: string,
    proposal: string
}

export interface IRegistrationFields {
    name: string
    tel: string
    email: string
    city: string
    company: string
    password: string
}

export interface IInputMask<T extends FieldValues> extends IFormInput<T> {
    mask: string
}

export interface IAuthorization {
    isVisible: boolean
    closeModal: () => void
}

export interface IPasswordRecoveryFields {
    email?: string
    newPassword?: string
    duplicatePassword?: string  
}

export interface IDataFetch {
    value: string ,
    nameField: string
}

export type RegData = null | IUser | string;

export type PatchNewPassword = {
    personalId: string
    password: string
}

export interface IQuantity {
    id: number,
    image: string
    name: string
    quantity: number
    price: number
    typeProduct: string
}

export interface ITastes {
    id: number
    image: string
    name: string
    text: string
}

export interface IAdditionally {
    id: number
    image: string
    name: string
    price: number
}

export type ObjAdditionally = {
    name: string
    price: number
}

export type IOptionSelect = { value: string, label: string }

export interface IOrder extends IFormDeliveryProduct {
    products: ISetCart[]
    price: number
    orderDate: string
    status: string
}