import React, { FC } from "react";
import styles from '../DeliveryProduct.module.scss';
import cn from 'classnames';

import Textarea from "../../../../../ui/textarea/Textarea";

import { IComment } from "../typesDelivery";
import { IFormDeliveryProduct } from "../typesDelivery";

const Comment: FC<IComment> = ({ register, error, changeIsReload }) => {
    return (
        <div className={cn(styles.form_block, styles.comment)}>
            <h4 className={cn(styles.textmini, styles.title_bottom)}>Комментарий к заказу</h4>
            <Textarea<IFormDeliveryProduct>
                register={register}
                error={error}
                nameReg={'message'}
                options={{
                    onChange() { changeIsReload() }
                }}
                name='message'
                placeholder='Здесь Вы можете написать пожелания, относительно анонимной доставки, текста открытки и другое.'
                className={cn('textmiddle inp_f_st', styles.area_second, styles.textarea)}
                errorClass='inp_f_er'
                nameSaveScrollHeight='scrollHeightDeliveryComment'
            />
        </div>
    )
}

export default React.memo(Comment);