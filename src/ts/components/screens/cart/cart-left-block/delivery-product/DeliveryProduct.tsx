import React, { FC, useState, useRef, useEffect } from 'react';
import styles from './DeliveryProduct.module.scss';
import cn from 'classnames';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormDeliveryProduct } from './typesDelivery';

import DeliveryMethod from './delivery-method/DeliveryMethod';
import PaymentMethods from './payment-methods/PaymentMethods';
import MainInp from './main-inp/MainInp';
import Selectors from './selectors/Selectors';
import BottomInf from './bottom-inf/BottomInf';
import Comment from './comment/Comment';
import Address from './adress/Adress';

import { useAppSelector } from '../../../../../hooks/useAppSelector';
import { useActions } from '../../../../../hooks/useActions';
import { useChangeSizeWindow } from '../../../../../hooks/useChangeSizeWindow';

const DeliveryProduct: FC = () => {
    const [ idOpen, setIdOpen ] = useState<number>(sessionStorage.getItem('deliveryId') ? JSON.parse(String(sessionStorage.getItem('deliveryId'))) : 2);
    
    const { isClickArrange, dateValue, timeValue } = useAppSelector(state => state.cart);
    const { setTimeValue, setDateValue, setDataDelivery, setIsClickArrange,  } = useActions();

    const { register, handleSubmit, reset, watch, resetField, setValue, trigger, setError, control, formState: { errors, isValid } } = useForm<IFormDeliveryProduct>({
        mode: 'onChange',
        defaultValues: {
            methodPayment: '',
            date: dateValue,
            time: timeValue
        }
    });
    const isReload = useRef<boolean>(true);
    const [ isReset, setIsReset ] = useState<boolean>(false);
    const [ firstRender, setFirstRender ] = useState<boolean>(true);
    const objWatch = watch();
    const size = useChangeSizeWindow();

    useEffect(() => {
        if (sessionStorage.getItem('saveDataFormDelivery')) {
            const saveData: IFormDeliveryProduct = JSON.parse(String(sessionStorage.getItem('saveDataFormDelivery')));

            if (saveData) {
                setValue('name', saveData.name);
                setValue('phone', saveData.phone);
                setValue('address', saveData.address);
                setValue('message', saveData.message);
                setValue('methodPayment', saveData.methodPayment);
                setValue('deliveryMethod', saveData.deliveryMethod);
                setValue('date', saveData.date);
                setValue('time', saveData.time)

                setDateValue(saveData.date);
                setTimeValue(saveData.time);

                if (sessionStorage.getItem('idCheck')) {
                    const idCheck: number = JSON.parse(String(sessionStorage.getItem('idCheck')));
                    const checkEl: HTMLInputElement | null = document.getElementById(String(idCheck)) as HTMLInputElement;

                    if (checkEl) checkEl.checked = true;
                }

                trigger();
            }
        }
    }, []);

    useEffect(() => {
        if (!isReload.current && !isReset) sessionStorage.setItem('saveDataFormDelivery', JSON.stringify(objWatch));
    }, [ objWatch, isReset ]);

    const onSubmit: SubmitHandler<IFormDeliveryProduct> = (data): void => {
        setIsReset(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setDataDelivery(data);
    
        if (size < 930) {
            reset();
            if (localStorage.getItem('saveDataFormDelivery')) localStorage.removeItem('saveDataFormDelivery');
            if (localStorage.getItem('deliveryId')) localStorage.removeItem('deliveryId');
            if (localStorage.getItem('idCheck')) localStorage.removeItem('idCheck');
            if (localStorage.getItem('data-is-added')) localStorage.removeItem('data-is-added');
        }
    }

    const changeIsReload = (): void => {
        if (isReload.current) isReload.current = false;
    }

    useEffect(() => {
        if (size > 930) {
            if (!firstRender && isClickArrange) reset();
            setFirstRender(false);
        }
    }, [ isClickArrange ])

    return (
        <section className={styles.delivery_sec} id='secmain'>
            <h1 className={cn(styles.titlemain, styles.del_title)}>Доставка</h1>
            <p className={cn(styles.textmiddle, styles.short_inf)}>Укажите контактные  данные и выберите способ доставки</p>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id='form-delivery'>
                <MainInp register={register} errorName={errors.name?.message} errorTel={errors.phone?.message} changeIsReload={changeIsReload}/>
                
                {/* Метод доставки */}
                <h4 className={cn(styles.textmini, styles.title_bottom)}>Способ доставки:</h4>
                <DeliveryMethod 
                    idOpen={idOpen}
                    setIdOpen={setIdOpen}
                    setValue={setValue}
                    resetField={resetField}
                    changeIsReload={changeIsReload}
                    objWatch={objWatch}
                    setError={setError}
                    register={register}
                />

                <Address register={register} error={errors.address?.message} changeIsReload={changeIsReload} idOpen={idOpen}/>
                <Selectors control={control} changeIsReload={changeIsReload}/>
                <Comment error={errors.message?.message} register={register} changeIsReload={changeIsReload}/>
                <PaymentMethods register={register} changeIsReload={changeIsReload} error={errors.methodPayment?.message}/>
                <BottomInf isValid={isValid}/>
            </form>
        </section>
    )
} 

export default React.memo(DeliveryProduct);