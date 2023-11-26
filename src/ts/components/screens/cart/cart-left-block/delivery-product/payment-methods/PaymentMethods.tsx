import React, { FC } from "react";
import cn from 'classnames';
import styles from '../DeliveryProduct.module.scss';

import Input from "../../../../../ui/inputs/Input/Input";

import { UseFormRegister } from "react-hook-form";
import { IFormDeliveryProduct } from "../typesDelivery";

const PaymentMethods: FC<{ register: UseFormRegister<IFormDeliveryProduct>, error: string | undefined, changeIsReload: () => void }> = ({ register, error, changeIsReload }) => {
    const checkFn = (e: React.MouseEvent): void => {
        changeIsReload()
        sessionStorage.setItem('idCheck', JSON.stringify(e.currentTarget.id));  
    }

    return (
        <div className={styles.block_methods}>
            <h4 className={cn(styles.textmini, styles.title_mt_pay)}>Метод оплаты</h4>
            <div className={styles.methods}>
                <div className={styles.method}>
                   <Input<IFormDeliveryProduct>
                        register={register}
                        error='empty'
                        nameReg={'methodPayment'}
                        options={{
                            required: 'Выберите один из предложенных вариантов',
                        }}
                        type='radio'
                        name='methodPayment'
                        id='mt-1'
                        value='Оплата картой онлайн'
                        onClick={checkFn}
                        className={styles.check}
                    />
                </div>
                <div className={styles.method}>
                   <Input<IFormDeliveryProduct>
                        register={register}
                        error='empty'
                        nameReg={'methodPayment'}
                        options={{
                            required: 'Выберите один из предложенных вариантов',
                        }}
                        type='radio'
                        name='methodPayment'
                        id='mt-2'
                        value='Наличными при получении'
                        onClick={checkFn}
                        className={styles.check}
                    />
                </div>
                <div className={styles.method}>
                   <Input<IFormDeliveryProduct>
                        register={register}
                        error='empty'
                        nameReg={'methodPayment'}
                        options={{
                            required: 'Выберите один из предложенных вариантов',
                        }}
                        type='radio'
                        name='methodPayment'
                        id='mt-3'
                        value='Яндекс деньги'
                        onClick={checkFn}
                        className={styles.check}
                    />
                </div>
        </div>
        { error && <p className='inp_f_er'>{error}</p> }
    </div>
    )
}

export default React.memo(PaymentMethods);