import React, {FC, useEffect, useState} from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';

import NavTop from './nav-top/NavTop';
import NavBottom from './nav-bottom/NavBottom';
import BurgerLogoAndBtn from './burger-menu/BurgerLogoAndBtn';
import secureLocalStorage from 'react-secure-storage';

import { useClickOutside } from '../../hooks/useClickOutside';
import { useModal } from '../../hooks/useModal';
import { useLocation } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

const Header: FC = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const location = useLocation();
    const { removeAllData } = useActions();

    useClickOutside('#burger', 'active', () => setIsOpen(false), '#burger-btn');
    useModal(isOpen);

    useEffect(() => {
        if (secureLocalStorage.getItem('nameProduct') && secureLocalStorage.getItem('quantity') &&
            secureLocalStorage.getItem('customData') && location.pathname !== '/assemble-sets' && location.pathname !== '/assemble-sets-with-printing') removeAllData();

        
    }, [ location ]);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <BurgerLogoAndBtn isOpen={isOpen} setIsOpen={setIsOpen}/>
                <div className={cn(styles.burger_window, { [styles.active]: isOpen })}>
                    <div id='burger' className={cn(styles.burger_menu, {
                        [styles.active]: isOpen,
                        'active': isOpen
                    })}>
                        <NavTop/>
                        <NavBottom/>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default React.memo(Header);