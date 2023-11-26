import React, { FC } from "react";
import styles from './HeadLink.module.scss';
import cn from 'classnames';

import { Link } from "react-router-dom";

import { HeadLink } from "../../../../../types";

const HeadLink: FC<{ headLink: HeadLink }> = ({ headLink }) => {
    return (
        <div style={{ backgroundImage: `url(${headLink.image})`}} className={styles.head_link}>
            <div className={styles.head_content}>
                <h1 className={cn(styles.titlemain, styles.title)}>{headLink.name}</h1>
                <p className={cn(styles.textmiddle, styles.text)}>{headLink.text}</p>
    
                <div className={styles.btns}>
                    <Link className={styles.link} to={'/macaroni-catalog'}><button className={cn(styles.main_button, styles.btn_c_sets, styles.btn)}>Готовые наборы</button></Link>
                    <Link className={styles.link} to={''}><button className={cn(styles.main_button, styles.btn_a_sets, styles.btn)}>Собрать свой набор</button></Link>
                </div>
            </div>
        </div>
    )
}

export default React.memo(HeadLink);
