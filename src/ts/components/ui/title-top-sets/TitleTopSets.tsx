import React, { FC } from 'react';
import '../../../../scss/_styles.scss';

import { Link } from 'react-router-dom';

const TitleTopSets: FC<{ nameCurrentPage: string }> = ({ nameCurrentPage }) => {
    return (
        <section className='title_top'>
            <Link to={'/'} className='text_link filter_color textmini'>Главная</Link>
            <span>»</span>
            <Link to={'/dessert-catalog'} className='text_link filter_color textmini'>Каталог</Link>
            <span>»</span>
            <p className='filter_color_active textmini'>{nameCurrentPage}</p>
        </section> 
    )
}

export default React.memo(TitleTopSets);