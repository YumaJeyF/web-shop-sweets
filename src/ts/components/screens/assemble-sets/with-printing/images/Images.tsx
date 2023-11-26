import React, { FC, useEffect, useState } from "react";
import styles from './Images.module.scss';
import cn from 'classnames';

import '../../AssembleSets.scss';

import { Link } from 'react-router-dom';
import { useActions } from "../../../../../hooks/useActions";

import LeftBlock from './left-block/LeftBlock';
import RightBlock from "./right-block/RightBlock";
import PrintArea from './print-area/PrintArea';
import CustomText from './custom-text/CustomText';

import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useOpenSaveModal } from "../../../../../hooks/useOpenSaveModal";


const Images: FC = () => {
    const { setStageName } = useActions();
    const { customData } = useAppSelector(state => state.assembleSets);

    useEffect(() => {
        if (!customData.images) setStageName('quantity');
    }, []);

    const [ isVisibleImage, setIsVisibleImage ] = useState<boolean>(false);
    const [ isVisibleText, setIsVisibleText ] = useState<boolean>(false);
    
    const { closeModal: closeCropImage, openModal: openCropImage } = useOpenSaveModal('cropCustomImage', setIsVisibleImage);
    const { closeModal: closeText, openModal: openText } = useOpenSaveModal('customText', setIsVisibleText);

    return (
        <section className={cn(styles.sec, 'assemble-sec')}>
            <PrintArea isVisible={isVisibleImage} closeModal={closeCropImage}/>
            <CustomText isVisible={isVisibleText} closeModal={closeText}/>
            <div className='title_top'>
                <Link to={'/'} className='text_link'>Главная</Link>
                <span>»</span>
                <p className='text_link' onClick={() => setStageName('quantity')}>Собрать набор</p>
                <span>»</span>
                <p className="filter_color_active">Выбрать количество</p>
            </div>
            <h1 className={cn('title titlemain', styles.title)}>Выберите изображения</h1>
            <p className={cn(styles.text, 'textmiddle')}>Загрузите собственные изображения или выберите из нашей галереи</p>
            <div className={cn("two_sec", styles.two_sec)}>
                <LeftBlock openCropImage={openCropImage} openText={openText}/>
                <RightBlock openCropImage={openCropImage} openText={openText}/>
            </div>
        </section>
    )
}

export default React.memo(Images);
