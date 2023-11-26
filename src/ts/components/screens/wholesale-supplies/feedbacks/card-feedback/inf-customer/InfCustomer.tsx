import React, { FC } from "react";
import styles from './InfCustom.module.scss';
import cn from 'classnames';

import { IFeedbacks } from "../../../../../../types";

const InfCustomer: FC<{ inf: IFeedbacks }> = ({ inf }) => {
    return (
        <div className={styles.inf_customer}>
            <div className={styles.left}>
                <p className={cn(styles.person_inf, 'textmicro')}>{inf.nameCustomer}</p>
                <p className={cn(styles.person_inf, 'textmicro')}>{inf.workingPosition}</p>
            </div>
            <img src={inf.icon} alt="Логотип фирмы" className={styles.icon} />
        </div>
    )
}

export default React.memo(InfCustomer);