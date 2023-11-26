import React, { FC } from "react";
import styles from './ModalResult.module.scss';
import cn from 'classnames';

import BtnClose from "../../../../../ui/btn-close/BtnClose";
import FirstContent from './first-content/FirstContent';
import SecondContent from './second-content/SecondContent';

import { useAppSelector } from "../../../../../../hooks/useAppSelector";

const ModalResult: FC<{ isVisible: boolean, closeModal: () => void, name?: string }> = ({ isVisible, closeModal, name }) => {
    const { isNextWindow } = useAppSelector(state => state.assembleSets);

    return (
        <div className={cn(styles.container, 'modal_c_default', { 'modal_c_default_active': isVisible })}>
            <div className={cn(styles.content, 'modal_content', { 'active': isVisible })} id="modal-result">
                <BtnClose customClass={styles.btn_close} classPath={styles.btn_path} onClick={() => closeModal()}/>

                {
                    !isNextWindow
                    ? <FirstContent name={name} closeModal={closeModal}/>
                    : <SecondContent name={name}/>
                }
            </div>
        </div>
    )
}

export default React.memo(ModalResult);