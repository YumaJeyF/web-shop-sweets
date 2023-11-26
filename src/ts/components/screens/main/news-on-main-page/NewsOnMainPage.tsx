import React, { FC } from 'react';
import styles from './NewsOnMainPage.module.scss';
import cn from 'classnames';

import SwiperNews from './swiper-news/SwiperNews';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getNews } from '../../../../services/getNews';

const NewsOnMainPage: FC = () => {
    const { data, isLoading, error } = useQuery(['news-with-pagination'], () => getNews.getAll());

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.news_sec}> 
            <h1 className={cn(styles.titlemain, styles.title_news)}>Новости</h1>
                {
                    data && data.length > 0 
                    ?
                    <div>
                        <SwiperNews data={data}/>
                        <Link to={'/news'} style={{ textDecoration: 'none' }}><button className={cn(styles.main_button, styles.btn)}>Все новости</button></Link>
                    </div>
                    :
                    <p className={styles.not_data}>На данный момент новостей нет</p>
                }

        </section>
    )
}

export default React.memo(NewsOnMainPage);