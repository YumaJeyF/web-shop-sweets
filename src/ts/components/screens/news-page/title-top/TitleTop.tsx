import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { INews } from '../../../../types';
import '../../../../../scss/_styles.scss';

const TitleTop: FC<{ data: INews }> = ({ data }) => {
    return (
        <div className='title_top'>
            <Link to='/' className='filter_color text_link'>Главная</Link>
            <span>»</span>
            <Link to={'/news'} className='filter_color text_link'>Новости</Link>
            <span>»</span>
            <p className='filter_color_active'>{data.name}</p>
        </div>
    )
}

export default React.memo(TitleTop);