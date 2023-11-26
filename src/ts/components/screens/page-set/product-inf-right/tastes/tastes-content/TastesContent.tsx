import React, { FC } from 'react';
import styles from './TastesContent.module.scss';
import cn from 'classnames';

import { TastesObj } from '../../../../../../types';

const TastesContent: FC<{ tastes: TastesObj[] }> = ({ tastes }) => {
    return (
        <div>
            {
                tastes && tastes.length > 0 && tastes.map((inf: TastesObj) => (
                    <div className={styles.tastes_inf} key={tastes.indexOf(inf)}>
                        <p className={cn(styles.name, styles.textmiddle)}>{inf.name}</p>
                        <span className={styles.line}></span>
                        <p className={cn(styles.count, styles.textmiddle)}>{inf.count} шт.</p>
                    </div>
                ))
            }
        </div>
    )
}

export default React.memo(TastesContent);