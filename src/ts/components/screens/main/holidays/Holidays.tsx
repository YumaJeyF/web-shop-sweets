import React, { FC, useRef } from 'react';
import styles from './Holidays.module.scss';

import { useQuery } from "@tanstack/react-query";
import { getUpcomingHolidays } from "../../../../services/getUpcomingHolidays";
import { IHolidays } from "../../../../types";

import HolidayInf from './holiday-inf/HolidayInf';

const Holidays: FC = () => {

    const { data, error, isLoading } = useQuery<IHolidays[]>(['upcoming-holidays'], () => getUpcomingHolidays.getAll());

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>;
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.holidays}>
                    <h1 className={`${styles.titlemain} ${styles.title_holidays}`}>Ближайшие праздники</h1> 
                    <div className={styles.main_inf}>
                        <div className={styles.dates}>
                            { data?.map((inf: IHolidays) => <HolidayInf key={inf.id} inf={inf}/>) }
                        </div>
                        <div className={styles.line}></div>
                    </div>
        </section>
    )
}

export default React.memo(Holidays);