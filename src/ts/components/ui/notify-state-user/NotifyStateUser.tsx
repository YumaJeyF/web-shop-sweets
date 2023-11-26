import React, { FC, useEffect, useState } from 'react';
import styles from './NotifyStateUser.module.scss';
import cn from 'classnames';

import { useAppSelector } from '../../../hooks/useAppSelector';

const NotifyStateUser: FC = () => {
    const { textNotify } = useAppSelector(state => state.user);
    const [ isActive, setIsActive ] = useState<boolean>(false);
    const [ firstRender, setFirstRender ] = useState<boolean>(true);

    useEffect(() => {
        if (textNotify != '' && !firstRender) {
            setIsActive(true);

            setTimeout(() => {
                setIsActive(false);
            }, 3000);
        }
        setFirstRender(false);
    }, [ textNotify ]);

    
    return (
        <div className={cn(styles.notify, { [styles.notify_active]: isActive})}>
            <p className={cn(styles.text, 'textmiddle')}>
                {textNotify}
            </p>
        </div>
    )
}

export default React.memo(NotifyStateUser);