import React, { FC } from "react";
import styles from '../Forms.module.scss';
import cn from 'classnames';

import Form from "../../../../form/Form";
import { useClickOutside } from "../../../../../hooks/useClickOutside";

const FormPaymentorder: FC<{ isVisible: boolean, closeModal: () => void }> = ({ isVisible, closeModal }) => {
    useClickOutside('#form-p-o', 'active', () => closeModal(), '#btn-form-p-o');

    return (
        <div className={cn(styles.modal_container, 'modal_c_default', { 'modal_c_default_active': isVisible })}>
            <Form
                closeModal={closeModal}
                classForBtnClose={{
                    btn: styles.btn_close,
                    path: styles.icon
                }}
                isVisible={isVisible}
                classNameForm={styles.form}
                classNameBlock={styles.block}
                classFields={styles.fields}
                classTextarea={{
                    textarea: styles.textarea,
                    parentBlock: styles.block_textarea
                }}
                classTitle={styles.title}
                classBtnSubmit={styles.btn}
                nameSaveScroll="orderPaymentScroll"
            />
        </div>
    )
}

export default React.memo(FormPaymentorder);