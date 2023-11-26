import React, { FC, useEffect } from 'react';
import styles from './NewsPage.module.scss';

import Header from '../../header/Header';
import TitleTop from './title-top/TitleTop';
import InfLeft from './inf-left/InfLeft';
import AssociatedSwipers from '../../ui/associated-swipers/AssociatedSwipers';
import Form from '../../form/Form';
import Footer from '../../footer/Footer';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSetTitle } from '../../../hooks/useSetTitle';
import { getNews } from '../../../services/getNews';
import { INews } from '../../../types';

const NewsPage: FC = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useQuery<INews>(['news', id], () => getNews.getCurrentNews(Number(id)));

    useSetTitle(data ? data.name : 'Новость');

    if (isLoading) return <img src="../../../../img/loading.gif" alt="Идёт загрузка" className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <>
            <Header/>
            <main className='main'>
                {
                    data &&
                    <>
                        <TitleTop data={data}/>
                        <section className={styles.sec_inf_news}>
                            <InfLeft data={data}/>
                            <AssociatedSwipers images={data.images}/>
                        </section>
                    </>
                }
            </main>
            <Form nameSaveScroll='newsPageScroll'/>
            <Footer/>
        </>
    )
}

export default React.memo(NewsPage);