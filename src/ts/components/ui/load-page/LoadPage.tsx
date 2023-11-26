import React, { FC, useEffect, useState } from "react";
import styles from './LoadPage.module.scss';
import { vars } from '../../../vars';

const LoadPage: FC = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const { body } = vars;

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 200);
    }, []);

    useEffect(() => {
        // if (isLoading && body) {
            // body.style.position = 'fixed';
        // } 
        // else if (body) body.style.position = '';
    }, [ isLoading ]);

    return (
        <>
            {
                isLoading && 
                <div className={styles.load}>
                    <img src="../../../../img/loading.gif" alt="Идёт загрузка..." className={styles.load_icon}/>
                </div>
            }
        </>
    )
}

export default React.memo(LoadPage);