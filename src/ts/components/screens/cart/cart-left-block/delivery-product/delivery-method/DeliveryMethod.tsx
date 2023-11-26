import React, { FC } from 'react';
import styles from '../DeliveryProduct.module.scss';
import cn from 'classnames';

import { useActions } from '../../../../../../hooks/useActions';
import Method from './method/Method';

import { IDeliveryMethod } from '../typesDelivery';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';

const DeliveryMethod: FC<IDeliveryMethod> = ({ idOpen, setIdOpen, setValue, resetField, changeIsReload, objWatch, setError, register }) => {
    const { setShippingCost, setIsFetch } = useActions();    
    const { isLogin } = useAppSelector(state => state.user);

    const changeDeliveryMethod = (id: number, nameField: string, price: number, condition: boolean, errorMessage: string): void => {
        if (idOpen != id) {
            setIdOpen(id);
            setValue('deliveryMethod', nameField);
            sessionStorage.setItem('deliveryId', JSON.stringify(id));
            resetField('address', { defaultValue: objWatch.address});
            changeIsReload();

            if (nameField === 'Курьерская доставка') setShippingCost(price);
            else setShippingCost(0);

            if (condition) setError('address', { type: 'string', message: errorMessage });
            if (isLogin) setIsFetch(true);
        }
    }

    return (
        <div className={cn(styles.form_flex, styles.form_block, styles.bl_md_d, styles.delivery_method)}>
            <Method
                idOpen={idOpen}
                currentId={1}
                changeDeliveryMethod={changeDeliveryMethod}
                srcIcon='../../../../../../../img/truck.svg'
                nameDelivery='Курьерская доставка'
                condition={objWatch.address === ''}
                errorMessage='Данное поле необходимо заполнить'
            />

            <Method
                idOpen={idOpen}
                currentId={2}
                changeDeliveryMethod={changeDeliveryMethod}
                srcIcon='../../../../../../../img/palm.svg'
                nameDelivery='Самовызов'
                condition={objWatch.address !== ''}
                errorMessage='Не нужно заполнять при самовызове'
            />

            <input
                { ...register('deliveryMethod') }
                type="text"
                name="deliveryMethod"
                value={ idOpen == 1 ? 'Курьерская доставка' : 'Самовызов' }
                style={{ display: 'none' }}
            />
        </div>
    )
}

export default React.memo(DeliveryMethod);