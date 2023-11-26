import React, { FC } from "react";
import styles from './ResultEstimation.module.scss';
import cn from 'classnames';

import { Link } from 'react-router-dom';

const ResultEstimation: FC = () => {
    return (
        <section className={styles.sec}>
            <h1 className="title-estimation titlebig">Спасибо за вашу оценку!</h1>
            <p className={cn(styles.text, 'textvmiddle_bold')}>Мы постоянно работаем над улучшением сервиса</p>
            <div className={styles.pic}>
                <img src="../../../../img/icon-res-est.png" alt="smile" className={styles.image}/>
            </div>
            <Link to='/' style={{ textDecoration: 'none' }}><button className={cn('main_button', styles.btn)}>На главную</button></Link>
        </section>
    )
}

export default React.memo(ResultEstimation);