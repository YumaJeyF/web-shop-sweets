import React, { FC, useEffect } from 'react';
import styles from './GeneralTastes.module.scss';
import cn from 'classnames';

import '../AssembleSets.scss';

import { useActions } from '../../../../hooks/useActions';
import { Link, useLocation } from 'react-router-dom';

import TastesLeft from './tastes-left/TastesLeft';
import TastesRight from './tastes-right/TastesRight';
import secureLocalStorage from 'react-secure-storage';

const GeneralTastes: FC<{ nextStageName: string }> = ({ nextStageName }) => {
    const { setStageName, removeAllData, removeAllTastes } = useActions();
    const location = useLocation();

    useEffect(() => {
        if (!secureLocalStorage.getItem('countTastes') && secureLocalStorage.getItem('customData')) removeAllTastes();

        if (!secureLocalStorage.getItem('quantity') || !secureLocalStorage.getItem('customData') || !secureLocalStorage.getItem('nameProduct')) {
            setStageName('quantity');
            removeAllData();
        }
    }, []);

    return (
        <section className='assemble-sec'>
            <div className='title_top'>
                <Link to={'/'} className='text_link'>Главная</Link>
                <span>»</span>
                <p className='text_link' onClick={() => setStageName('quantity')}>Собрать набор</p>
                <span>»</span>
                <p className= 'text_link' onClick={() => setStageName('quantity')}>Выбрать количество</p>
                <span>»</span>
                <p className='filter_color_active'>Выбрать вкусы</p>
            </div>
            <h1 className='titlemain title'>Выберите вкусы</h1>

            <div className='two_sec'>
                <TastesLeft/>
                <TastesRight nextStageName={nextStageName}/>
            </div>

        </section>
    )
}

export default React.memo(GeneralTastes);