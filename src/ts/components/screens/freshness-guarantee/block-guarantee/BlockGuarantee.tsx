import React, { FC } from "react";
import styles from './BlockGuarantee.module.scss';
import cn from "classnames";

import { useQuery } from "@tanstack/react-query";
import { getFreshnessGuarantee } from "../../../../services/getFreshnessGuarantee";
import { IFreshnessGuarantee } from "../../../../types";

import LoadableImage from "../../../ui/LoadableImage/LoadableImage";

const BlockGuarantee: FC = () => {
    const { data, error, isLoading } = useQuery(['get-freshness-guarantee'], () => getFreshnessGuarantee.getAll());

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className={styles.icon_loading}/>
    if (error) throw new Error(`Возникла ошибка при попытке получить данные о гарантии вкуса и качества (${error})`);

    return (
        <div className={styles.cards}>
            { data && data.length > 0 && data.map((inf: IFreshnessGuarantee) => (
                <div className={styles.card} key={inf.id}>
                    <div className={styles.pic}>
                        <LoadableImage src={inf.image} alt="picture"/>
                    </div>
                    <p className={cn(styles.textmiddle, styles.text)}>{inf.text}</p>
                </div>
            ))}
        </div>
    )
}

export default React.memo(BlockGuarantee);