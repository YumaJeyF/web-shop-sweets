import React, { FC } from 'react';

import { useActions } from '../../../../hooks/useActions';
import { Link } from 'react-router-dom';

const LinksQuantity: FC = () => {
    const { setStageName } = useActions();

    return (
        <div className='title_top'>
            <Link to={'/'} className="text_link">Главная</Link>
            <span>»</span>
            <p className='text_link' onClick={() => setStageName('quantity')}>Собрать набор</p>
            <span>» </span>
            <p className="filter_color_active">Выбрать количество</p>
        </div>
    )
}

export default React.memo(LinksQuantity);