import React, { FC, useEffect } from "react";
import styles from './TopInf.module.scss';
import cn from 'classnames';

import { useAppSelector } from "../../../../../../../../hooks/useAppSelector";
import { TastesObj, ObjAdditionally } from "../../../../../../../../types";

const TopInf: FC<{ name?: string }> = ({ name }) => {
    const { quantity, customData, nameProduct } = useAppSelector(state => state.assembleSets);
    
    return (
        <div className={styles.top}>
            <h1 className={cn(styles.title, 'titlemain')}>Ваш выбор:</h1>
            <h2 className={cn("textvmiddle_bold", styles.name)}>Набор {nameProduct} {quantity} шт. { name ? `${name}` : '' } <span className="red">{customData.price} руб.</span></h2>
            
            <div className={styles.tastes}>
                {customData.tastes.length > 0 && customData.tastes.map((inf: TastesObj) => (
                    <p className={cn('textmini', styles.taste)} key={customData.tastes.indexOf(inf)}>{inf.name} {inf.count} шт.</p>
                ))}
            </div>
            
            <div className={styles.additionally}>
                {customData.additionally && customData.additionally.length > 0 && customData.additionally.map((inf: ObjAdditionally) => (
                    <p className={cn(styles.text, 'textvmiddle_bold')} key={customData.additionally && customData.additionally.indexOf(inf)}>{inf.name} <span className="red">{inf.price} шт.</span></p>
                ))}
            </div>
        </div>
    )
}

export default React.memo(TopInf);