import React, { FC, useState } from 'react';
import styles from '../Header.module.scss';
import cn from 'classnames';

import City from '../city/City';
import DropdownBlock from './dropdown-block/DropdownBlock';

import { Link } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { removeTheFixation } from '../../../functions/removeTheFixation';
import { useClickOutside } from '../../../hooks/useClickOutside';

const NavBottom: FC = () => {
    const [ nowIdOpen, setNowIdOpen ] = useState<number>(0);
    const { setStageName } = useActions();

    useClickOutside('#dp_bl', 'active', () => setNowIdOpen(0));

    return (
        <div className={styles.navbottom}>
            <div className={cn(styles.city_mobile, styles.burger_padding)}><City/></div>

            <Link to={'/privacy-policy'} className={cn('textmini', styles.text, styles.nb_text, styles.burger_padding)} style={{ textDecoration: 'none' }} onClick={removeTheFixation}>ПОЛИТИКА ПРИВАТНОСТИ</Link>
            <DropdownBlock
                nowIdOpen={nowIdOpen}
                setNowIdOpen={setNowIdOpen}
                name='ВЕСЬ КАТАЛОГ'
                currentId={4}
                Links={() => {
                    return (
                        <>
                            <li><Link to={'/complete-sets'} className={styles.link}>Готовые наборы</Link></li>
                            <li><Link to={'/dessert-catalog'} className={styles.link}>Каталог десертов</Link></li>
                            <li><Link to={'/macaroni-catalog'} className={styles.link}>Каталог макарон</Link></li>
                            <li><Link to={'/tubes-catalog'} className={styles.link}>Каталог трубочек</Link></li>
                            <li><Link to={'/eclairs-catalog'} className={styles.link}>Каталог эклеров</Link></li>
                            <li><Link to={'/profiteroles-catalog'} className={styles.link}>Каталог профитролей</Link></li>
                        </>
                    )
                }}
            />
            
            <Link to={'/assemble-sets'} className={cn('textmini', styles.text, styles.nb_text, styles.burger_padding)} style={{ textDecoration: 'none' }}
                onClick={() => {
                    setStageName('quantity');
                    removeTheFixation();
                }}
            >СОБРАТЬ НАБОР</Link>
            <Link to='/' style={{ cursor: 'pointer' }}><img src="../../../../img/main-logo.svg" alt="logo company" className={styles.logo_hidden}/></Link>
            <Link to={'/assemble-sets-with-printing'} className={cn('textmini', styles.text, styles.nb_text, styles.burger_padding)}
                onClick={() => {
                    setStageName('quantity');
                    removeTheFixation();
                }} 
                style={{ textDecoration: 'none' }}>СОЗДАТЬ ДИЗАЙН</Link>

            <DropdownBlock
                nowIdOpen={nowIdOpen}
                setNowIdOpen={setNowIdOpen}
                name='КОМПАНИЯМ'
                currentId={3}
                Links={() => {
                    return (
                        <>
                            <li><Link to={'/wholesale-supplies'} className={styles.link}>Оптовые поставки</Link></li>
                            <li><Link to={'/corporate-gifts'} className={styles.link}>Корпоративные подарки</Link></li>
                        </>
                    )
                }}
            />
            <Link to={'/estimation'} className={cn('textmini', styles.text, styles.nb_text, styles.burger_padding)} style={{ textDecoration: 'none' }} onClick={removeTheFixation}>ОЦЕНИТЬ НАС</Link>
        </div>
    )
}

export default React.memo(NavBottom);