import React, { FC } from "react";
import styles from './TastesCart.module.scss';
import cn from 'classnames';

import { TastesObj } from "../../../../../../types";

const TastesCart: FC<{ tastes: TastesObj[]}> = ({ tastes }) => {
    return (
        <div className={styles.tastes}>
            { tastes && tastes.length > 0 && tastes.map((inf: TastesObj) => (
                <p className={cn(styles.textmicro, styles.text)} key={tastes.indexOf(inf)}>{inf.name} {inf.count} шт.</p>
            )) }
        </div>
    )
}

export default React.memo(TastesCart);