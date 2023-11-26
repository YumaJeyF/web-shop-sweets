import React, { FC, useEffect } from 'react';
import styles from './PageSet.module.scss';

import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import ProductTitleTop from './product-title-top/ProductTitleTop';
import AssociatedSwipers from '../../ui/associated-swipers/AssociatedSwipers';
import ProductInfRight from './product-inf-right/ProductInfRight';
import TopInf from './product-inf-right/top_inf/TopInf';
import YouMayLike from './you-may-like/YouMayLike';
import Tabs from './product-inf-right/tabs/Tabs';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getSets } from '../../../services/getSets'
import { ISet } from '../../../types';
import { useChangeSizeWindow } from '../../../hooks/useChangeSizeWindow';
import { useSetTitle } from '../../../hooks/useSetTitle';

const PageSet: FC = () => {
    const { id } = useParams();
    const size = useChangeSizeWindow();
    const { data, isLoading, error } = useQuery<ISet>(['current-set'], () => getSets.getCurrentDataById(Number(id)));

    useSetTitle(data?.name);

    if (error) return <p style={{ textAlign: 'center' }}>Ошибка загрузки данных</p>

    return (
        <>
            <Header/>
            <main className='main mb_main'>
                { isLoading && <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/> }
                {
                    data &&
                    <>
                        <section className={styles.sec_page_product}>
                            <ProductTitleTop data={data}/>

                            <section className={styles.main_inf_product}>
                                { size <= 690 &&  <TopInf data={data}/>}
                                <AssociatedSwipers images={data.images}/>
                                <ProductInfRight data={data}/>
                            </section>
                            { size > 690 && <Tabs data={data}/> }
                        </section>
                        <YouMayLike themes={data.themes} id={Number(id)} type={data.type}/>
                    </>
                }
            </main>
            <Footer/>
        </>
    )
}

export default React.memo(PageSet);