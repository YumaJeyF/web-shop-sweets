import React, { FC } from "react";
import styles from './CardContacts.module.scss';
import cn from "classnames";

import { blockContacts } from "../../../../../types";

const BlockContent: FC<{ inf: blockContacts }> = ({ inf }) => {
    return (
        <div className={styles.card}>
            <h2 className={cn(styles.textvmiddle_bold, styles.titlemid)}>{inf.name}</h2>
        
            <div className={styles.texts}>
                { inf.texts.length > 0 && inf.texts.map((text: string) => <p className={cn(styles.textvmiddle, styles.text)} key={inf.texts.indexOf(text)}>{text}</p>) }
            </div>
        </div>
    )
}

export default React.memo(BlockContent);