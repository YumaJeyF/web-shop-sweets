import React, { FC } from 'react';
import '../../../../scss/_styles';
import { Link } from 'react-router-dom';

import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import FiltersNews from './filters-news/FiltersNews';
import { getNews } from '../../../services/getNews';

import CardNews from './card-news/CardNews';
import { INews } from '../../../types';

import { useAppSelector } from '../../../hooks/useAppSelector';
import { useGetData } from '../../../hooks/useGetData';
import { useActions } from '../../../hooks/useActions';
import { useSetTitle } from '../../../hooks/useSetTitle';

const News: FC = () => {
    useSetTitle('Новости');

    const { setPage, setFilters, setNameFilters } = useActions();
    const { nameFilter, page } = useAppSelector(state => state.filter);
    const limit = 9;
    const { isLoading, error, setDefaultFetch, data, loading, totalCount, loadMoreData } = useGetData(nameFilter, setNameFilters, page, setPage, setFilters,
          () => getNews.getWithPagination(limit, page, nameFilter), true
    );

    if (isLoading) return <p>Загрузка новостей...</p>
    if (error) return <p>Возникла ошибка загрузки новостей</p>

    return (
        <>
            <Header/>
            <main className='main'>
                <section className='catalog_sec'>
                <div className='title_top'>
                    <Link to={'/'} className='textmini text_link filter_color'>Главная</Link>
                    <span>»</span>
                    <Link to={'/main/news'} className='textmini text_link filter_color_active'>Новости</Link>
                </div>
                <h1 className='titlemain title_catalog'>Новости</h1>
                
                <FiltersNews setDefaultFetch={setDefaultFetch}/>

                <div className='catalog_news product_catalog'>
                    {
                        data && data.length > 0
                        ?
                        data.map((inf: INews) => <CardNews inf={inf} key={inf.id}/>)
                        :
                        <p>На данный момент новостей нет</p>
                    }

                </div>

                { loading && <img src="../../../../img/loading.gif" alt="load..." className='icon_loading' /> }
                { data.length < totalCount && <button className='main_button btn_catalog' onClick={loadMoreData} >Показать ещё</button> }
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(News);