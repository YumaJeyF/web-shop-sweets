import React, { FC } from 'react';
import styles from './PrivacyPolicy.module.scss';
import cn from 'classnames';

import Header from '../../header/Header';
import Footer from '../../footer/Footer';

import { useQuery } from '@tanstack/react-query';
import { getPrivacyPolicy } from '../../../services/getPrivacyPolicy';
import { Link } from 'react-router-dom';
import { useSetTitle } from '../../../hooks/useSetTitle';

interface IPrivacyPolicy {
    firstInf: string[]
    subTitle: string
    secondInf: string[]
}

const PrivacyPolicy: FC = () => {
    useSetTitle('Политика приватности');

    const { data, error, isLoading } = useQuery<IPrivacyPolicy>(['get-privacy-policy'], () => getPrivacyPolicy());

    if (isLoading) return <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <>
            <Header/>
            <main className='main'>
                <div className='title_top'>
                    <Link to={'/'} className='text_link'>Главная</Link>
                    <span>»</span>
                    <p className='filter_color_active textmini'>Политика приватности</p>
                </div>

                <h1 className={cn('titlemain', styles.title)}>Политика приватности</h1>

                { data &&
                
                    <div className={styles.policy}>
                        { data.firstInf.length > 0 && data.firstInf.map((text: string, index: number) => <p key={index} className={cn(styles.text, 'textmiddle')}>{text}</p>) }
                        <h2 className={cn(styles.subtitle, 'textvmiddle_bold')}>{data.subTitle}</h2>
                        { data.secondInf.length > 0 && data.secondInf.map((text: string, index: number) => <p key={index} className={cn(styles.text, 'textmiddle')}>{text}</p>) }
                    </div>
                }

            </main>
            <Footer/>
        </>
    )
}

export default React.memo(PrivacyPolicy);