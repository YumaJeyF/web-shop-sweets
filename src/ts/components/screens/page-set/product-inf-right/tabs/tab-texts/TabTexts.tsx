import React, { FC } from 'react';
import styles from '../Tabs.module.scss';
import cn from 'classnames';

const TabTexts: FC<{ texts: string[] }> = ({ texts }) => {
    return (
        <div>
            {
                texts && texts.length > 0 && texts.map((inf: string, index: number) => (
                    <p key={index} className={cn(styles.textmiddle, styles.text_tabs)}>{inf}</p>
                ))
            }
        </div>
    )
}

export default React.memo(TabTexts);