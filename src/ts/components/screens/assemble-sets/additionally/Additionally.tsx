import React, { FC, useEffect } from "react";
import styles from './Additionally.module.scss';
import cn from 'classnames';
import { Link, useLocation } from "react-router-dom";

import '../AssembleSets.scss';

import LeftBlock from './left-block/LeftBlock';
import RightBlock from "./right-block/RightBlock";

import { useActions } from "../../../../hooks/useActions";
import secureLocalStorage from "react-secure-storage";

const Additionally: FC<{ name?: string }> = ({ name }) => {
    const { setStageName, removeAllData } = useActions();
    const location = useLocation();

    useEffect(() => {
        if (!secureLocalStorage.getItem('nameProduct') || !secureLocalStorage.getItem('quantity') ||
            !secureLocalStorage.getItem('customData') || !secureLocalStorage.getItem('countTastes')) {
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
                <p className='text_link' onClick={() => setStageName('quantity')}>Выбрать количество</p>
                <span>»</span>
                <p className='text_link' onClick={() => setStageName('tastes')}>Выбрать вкусы</p>
                <span>»</span>
                <p className="filter_color_active">Дополнительно</p>
            </div>
            <h3 className='titlemain title'>Дополнительно</h3>
            <div className='two_sec'>
                <LeftBlock/>
                <RightBlock name={name}/>
            </div>
        </section>
    )
}

export default React.memo(Additionally);