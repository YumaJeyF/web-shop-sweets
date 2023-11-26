import React, { FC } from "react";
import styles from './FirstInf.module.scss';
import cn from 'classnames';

const FirstInf: FC<{ title: string, text: string }> = ({ title, text }) => {
    return (
        <div className={styles.inf_shop}>
            <h1 className={styles.name}>MACARONSHOP</h1>
            <h2 className={cn('textmiddle', styles.since_text)}>since 2013</h2>
            <h1 className={cn('titlebig', styles.title)}>{title}</h1>
            <p className={cn('textvmiddle', styles.text_inf)}>{text}</p>
        </div>
    )
}

export default React.memo(FirstInf);