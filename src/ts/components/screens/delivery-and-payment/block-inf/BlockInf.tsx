import React, { FC } from "react";
import styles from './BlockInf.module.scss';
import cn from "classnames";

import Cap from "../block-first/cap/Cap";

import { Link } from "react-router-dom";
import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";

const BlockInf: FC<{ texts: string[], nameTitle: string, isCourierDelivery?: boolean, linkLocationNumber?: number }> = ({ texts, nameTitle, isCourierDelivery, linkLocationNumber }) => {
    const size = useChangeSizeWindow();

    return (
        <div className={styles.block_inf}>
            { (size > 768 && isCourierDelivery) && <Cap/> }

            <h2 className={cn(styles.delivery_title, styles.textvmiddle_bold, styles.title)}>{nameTitle}</h2>
            <div className={styles.texts}>
                { texts && texts.map((text: string) => (
                    <p className={cn(styles.delivery_text, styles.textmiddle)} key={texts.indexOf(text)}>
                        {text}
                        { (linkLocationNumber && isCourierDelivery && texts.indexOf(text) + 1 === linkLocationNumber)
                         && <Link to={''} className={cn(styles.red, styles.link)}>Точная зона доставки.</Link> }
                    </p>
                )) }
            </div>
        </div>
    )
}

export default React.memo(BlockInf);
