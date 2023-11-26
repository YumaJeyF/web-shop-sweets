import React, { FC } from 'react';
import { IHolidays } from '../../../../../types';
import styles from './HolidayInf.module.scss';

const HolidayInf: FC<{inf: IHolidays}> = ({ inf }) => {
    return (
        <div className={styles.dates_block} key={inf.id}>

            {
                inf.holidayHat
                ?
                <div className={styles.icon}>
                    <img src={inf.holidayHat} className={styles.pic_hat} alt="hat"/>
                    <img src={inf.picture} className={styles.pic} alt="picture"/>
                </div>
                :
                <div className={styles.icon}>
                    <img src={inf.picture} className={styles.pic} alt="picture"/>
                </div>
            }

            <p className={`${styles.text} ${styles.textmini}`}>{inf.name}</p>
        </div>
    )
}

export default React.memo(HolidayInf);