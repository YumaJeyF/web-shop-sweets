import React, { FC, useState } from "react";
import styles from './RightBlock.module.scss';
import cn from 'classnames';

import '../../AssembleSets.scss';

import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { ObjAdditionally } from "../../../../../types";

import BtnClose from "../../../../ui/btn-close/BtnClose";
import ModalResult from './modal-result/ModalResult';

import { useActions } from "../../../../../hooks/useActions";
import { useChangeSizeWindow } from "../../../../../hooks/useChangeSizeWindow";
import { useModal } from "../../../../../hooks/useModal";
import { useOpenSaveModal } from "../../../../../hooks/useOpenSaveModal";
import { useClickOutside } from "../../../../../hooks/useClickOutside";

const RightBlock: FC<{ name?: string }> = ({ name }) => {
    const { countTastes, customData, nameProduct, isNextWindow } = useAppSelector(state => state.assembleSets);
    const { removeParameter, setTextNotify, setStageName, removeAllData } = useActions();
    const size = useChangeSizeWindow();

    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const { openModal, closeModal } = useOpenSaveModal('assembleSetsResult', setIsVisible);
    useModal(isVisible);

    const newCloseModal = () => {
        closeModal();

        if (isNextWindow) {
            setStageName('quantity');
            removeAllData();
            setTextNotify('Набор успешно создан и добавлен в корзину. Можете создать ещё набор или же заняться другими делами');
        }
    } 

    useClickOutside('#modal-result', 'active', () => newCloseModal(), "#btn-a-s");

    return (
        <section className={cn(styles.sec, 'inf-right')}>
            <ModalResult isVisible={isVisible} closeModal={newCloseModal} name={name}/>
            <div>
            
            <h2 className={cn(styles.title, 'count textvmiddle_bold')}>Набор { name ? `${nameProduct}` : '' } {countTastes} шт. {name ? `${name}` : ''} <span className="red">{customData.price} руб.</span></h2>

            <div className={cn('middle', { 'middle_empty': customData.additionally && customData.additionally.length <= 0 })}>
                {customData.additionally && customData.additionally.length > 0 && customData.additionally.map((el: ObjAdditionally) => (
                    <div key={customData.additionally &&  customData.additionally.indexOf(el)} className={cn('inf-card', styles.inf)}>
                        <h2 className="name textmini">{el.name} <span className="red">{el.price} руб.</span></h2>
                        { size > 730 && <BtnClose customClass='btn_close' classPath="btn_path" onClick={() => removeParameter(el.name)}/> }
                    </div>
                )) }
            </div>
            </div>
            <div className="bottom">
                <button className={cn(styles.btn, 'red_btn_form', { 'btn': size > 730 })} id="btn-a-s" onClick={() => openModal()}>Готово</button>
            </div>
        </section>
    )
}

export default React.memo(RightBlock);