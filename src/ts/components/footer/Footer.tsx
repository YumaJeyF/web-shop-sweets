import React, { FC } from 'react';
import styles from './Footer.module.scss';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import MainInf from './main-inf/MainInf';
import LastBlock from './last-block/LastBlock';

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.block}>
                <MainInf/>
                <div className={styles.desktop_company_inf}>
                    <p className='textmicro' style={{ color: '#292929' }}>© 2024 Макароншоп</p>
                    <p className='textmicro'>ООО "Квантум", Санкт-Петербург, улица Маршала Тухачевского, дом 22</p>
                </div>
            </div>
            <div className={styles.block}>
                <h1 className={styles.title_middle}>ИНФОРМАЦИЯ</h1>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>О компании</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Гарантии вкуса и свежести</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Доставка и оплата</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Контакты</Link>
            </div>
            <div className={styles.block}>
                <h1 className={styles.title_middle}>КАТАЛОГ</h1>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Каталог десертов</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Готовые наборы</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Собрать свой набор</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Наборы с печатью</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Свадебные предложения</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Акции</Link>
            </div>
            <div className={styles.block}>
                <h1 className={styles.title_middle}>ДЛЯ БИЗНЕСА</h1>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Корпоративные подарки</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Для юридических лиц</Link>
                <Link to={'#'} className={cn('textmini', styles.text_block)}>Оптовикам</Link>
            </div>
            <div className={styles.block}><LastBlock/></div>
        </footer>
    )
}

export default React.memo(Footer);