import React, { FC } from "react";
import cn from 'classnames';
import styles from '../DeliveryProduct.module.scss';

import Textarea from "../../../../../ui/textarea/Textarea";
import { IAdress } from "../typesDelivery";
import { IFormDeliveryProduct } from "../typesDelivery";

const Address: FC<IAdress> = ({ register, error, changeIsReload, idOpen }) => {
    return (
        <div className={styles.form_block}>
            <h4 className={cn(styles.textmini, styles.title_bottom)}>Адрес доставки</h4>
            <Textarea<IFormDeliveryProduct>
                register={register}
                error={error}
                nameReg={'address'}
                options={{
                    pattern: {
                        value: idOpen == 2 ? /^\s*$/ : /./,
                        message: idOpen == 2 ? 'Не нужно заполнять при самовызове' : ''
                    },
                    onChange() { changeIsReload() },                            
                    required: idOpen == 1 ? 'Данное поле необходимо заполнить' : false
                }}
                name='address'
                placeholder='Не нужно заполнять при самовывозе'
                className={cn('textmiddle inp_f_st', styles.area_first, styles.textarea)}
                errorClass='inp_f_er'
                nameSaveScrollHeight='scrollHeightDeliveryAdress'
            />
        </div>
    )
}

export default React.memo(Address);