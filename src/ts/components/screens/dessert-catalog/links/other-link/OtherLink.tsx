import React, { FC } from "react";
import styles from './OtherLink.module.scss';
import cn from "classnames";

import { OtherLinks } from "../../../../../types";

import { useChangeSizeWindow } from "../../../../../hooks/useChangeSizeWindow";
import { Link } from "react-router-dom";

const OtherLink: FC<{ inf: OtherLinks }> = ({ inf }) => {
    const size = useChangeSizeWindow();

    return (
        <Link to={inf.link} className={cn(styles.other_link)}>
            <div style={{ backgroundColor: ((size > 470) || inf.id != 3) ? inf.backColor : '' }}>
                <div className={styles.pic}>
                    <img src={inf.image} className={styles.image}/>
                </div>
                <p className={cn(styles.textvmiddle_bold, styles.title_o_l)} style={{ color: inf.colorName }}>{inf.name}</p>
            </div>
        </Link>
    )
}

export default React.memo(OtherLink);