import React, { FC, useState } from "react";
import styles from './SecondTopBlock.module.scss';
import cn from 'classnames';

import { useModal } from "../../../../hooks/useModal";
import { useOpenSaveModal } from "../../../../hooks/useOpenSaveModal";

import FormDownloadGifts from "../forms/form-download-gifts/FormDownloadGifts";

const SecondTopBlock: FC<{ texts: string[] }> = ({ texts }) => {
    const [ isVisible, setIsVisible ] = useState<boolean>(sessionStorage.getItem('dowloadGiftsForm') ? true : false);
    const { openModal, closeModal } = useOpenSaveModal('dowloadGiftsForm', setIsVisible);
    useModal(isVisible);

    return (
        <div className={styles.block}>
            { texts && texts.length > 0 && texts.map((text: string) => <p className='textmiddle text_h_p' key={texts.indexOf(text)}>{text}</p>) }

            <FormDownloadGifts isVisible={isVisible} closeModal={closeModal}/>

            <button className={cn(styles.btn, 'textmini')} onClick={openModal} id="btn-c-gifts">Скачать весь каталог продуктов</button>
        </div>
    )
}

export default React.memo(SecondTopBlock);