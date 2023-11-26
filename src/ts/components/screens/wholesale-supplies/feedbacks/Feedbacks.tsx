import React, { FC } from "react";
import styles from './Feedback.module.scss';
import cn from 'classnames';

import { useQuery } from "@tanstack/react-query";
import { getFeedbacks } from "../../../../services/getFeedbacks";
import { ArrFeedbacks } from "../../../../types";
import { IFeedbacks } from "../../../../types";
import { useLoading } from "../../../../hooks/useLoading";

import CardFeedback from "./card-feedback/CardFeedback";

const Feedbacks: FC = () => {
    const { ref, isVisible } = useLoading();
    const { error, isLoading, data } = useQuery<ArrFeedbacks[]>(['get-recommendations', isVisible], () => isVisible ? getFeedbacks.getAll() : []);

    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec} ref={ref}>
            <h1 className={cn(styles.title, 'titlemain')}>Нас рекомендуют</h1>
            { isLoading && <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/> }

            <div className={styles.feedbacks}>
            {
                data && data.length > 0 && data.map((blocks: ArrFeedbacks) => (
                    <div className={styles.block} key={data.indexOf(blocks)}>
                        { blocks.map((inf: IFeedbacks) =>
                        <CardFeedback
                            inf={inf}
                            key={inf.id}
                            addClass={(data.length === data.indexOf(blocks) + 1) && (blocks.length === blocks.indexOf(inf) + 1) ? true : false}
                        />
                    )}
                    </div>
                )).slice(0, 3)
            }
        </div>
        </section>
    )
}

export default React.memo(Feedbacks);