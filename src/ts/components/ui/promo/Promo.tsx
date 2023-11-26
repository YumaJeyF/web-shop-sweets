import React, { ChangeEvent, FC, useState } from 'react';
import styles from './Promo.module.scss';
import cn from 'classnames';

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../hooks/useAppSelector';

import { IPromo } from '../../../types';
import { getPromoCodes } from '../../../services/getPromoCodes';
import { useActions } from '../../../hooks/useActions';
import { SubmitHandler, useForm } from 'react-hook-form';
import BtnAuthorization from '../btn-authorization/BtnAuthorization';

const Promo: FC = () => {
    const { setTextNotify, setDiscountPromo } = useActions();
    const { userId } = useAppSelector(state => state.user);
    const { handleSubmit, register, formState: { errors, isValid }, setError, reset } = useForm<{ promo: string }>({ mode: 'onChange' });
    const [ value, setValue ] = useState<string>('');
    const [ btnDisabled, setBtnDisabled ] = useState<boolean>(false);
    const [ promo, setPromo ] = useState<string>('');
    
    const { error, isFetching } = useQuery<IPromo | string | null>(
        ['get-promo', promo], 
        () => {
            if (promo !== '' && userId !== '') return getPromoCodes.getCurrentPromoCode(promo, userId);
            else return null;
        },
        {
            onSuccess(data: IPromo | string | null) {
                if (data) {
                    if (typeof data !== 'string') {
                        setBtnDisabled(false);
                        setTextNotify('Промокод активирован');
                        setPromo('');
                        setDiscountPromo(data);
                        reset();
                    }
                    else {
                        setError('promo', { message: data });
                        setBtnDisabled(true);
                    }
                }
            }
        }
    );

    if (error) throw new Error(`${error}`);

    const fnPromo = (promoValue: string) => {
        if (userId !== '') setPromo(promoValue);
        else {
            setBtnDisabled(true);
            setTextNotify('Для использования промокода необходимо войти в аккаунт');
        }
    }

    return (
        <form className={styles.form}>
            <div className={styles.promo}>
                <p className={cn(styles.textmiddle, styles.promo_title)}>Промокод:</p>
                <label className={styles.field_inf}>
                    <div className={styles.block_inp}>
                    <input { ...register('promo', {
                        required: true,
                        minLength: 3,
                        onChange: (e: ChangeEvent<HTMLInputElement>) => {
                            if (btnDisabled) setBtnDisabled(false);

                            setValue(e.currentTarget.value);
                        }
                    }) } type="text" name="promo" id='promo-code' placeholder='Введите промокод' className={cn(styles.textmiddle, styles.textfield)}/>
                    </div>
                    <BtnAuthorization loading={isFetching} conditionActive={!isValid || btnDisabled} customClass={cn(styles.btn_apply, 'textmini')} nameBtn='Применить'
                        onClick={() => fnPromo(value)}
                    />
                </label>
            </div>
            { errors.promo?.message && <p className={cn('inp_f_er', styles.error)}>{errors.promo.message}</p> }
        </form>
    )
}

export default React.memo(Promo);