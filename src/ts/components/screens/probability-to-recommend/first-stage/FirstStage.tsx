import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from './FirstStage.module.scss';
import cn from 'classnames';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getJudgingCriteria } from '../../../../services/getJudgingCriteria';
import { sendVoice } from '../../../../services/sendVoice';

export interface IJudgingCriteria {
    id: number
    image: string
    name: string
    numberOfVotes: number
}

const ProbabilityToRecommend: FC<{ setStageNumber: Dispatch<SetStateAction<number>> }> = ({ setStageNumber }) => {
    const { data, error, isLoading } = useQuery<IJudgingCriteria[]>(['get-criteria'], () => getJudgingCriteria());

    const mutation = useMutation(({ id, quantity }: { id: number, quantity: number }) => sendVoice(id, quantity), { onSuccess() { setStageNumber(2) } });

    if (isLoading) return <img src="../../../../../img/loading.gif" alt="Идёт загрузка..." className='icon_loading'/>
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec}>
            <h1 className='titlebig title-estimation'>Оцените нас</h1>
            <p className={cn(styles.text, 'textvmiddle_bold')}>С какой вероятностью вы порекомендуете нас друзьям?</p>

            <div className={styles.catalog}>
                { data && data.length > 0 && data.map((inf: IJudgingCriteria) => (

                    <div key={inf.id} className={styles.card}>
                        <div className={styles.card_top}>
                            <img src={inf.image} alt="picture" className={styles.card_image}/>
                        </div>
                        <div className={styles.card_bottom}>
                            <input type="checkbox" id={`check-${inf.id}`} className={styles.card_checkbox} name="estimation"
                                onChange={() => mutation.mutate({ id: inf.id, quantity: inf.numberOfVotes })}
                            />
                            <label htmlFor={`check-${inf.id}`} className={cn(styles.card_text, 'textmini')}>{inf.name}</label>
                        </div>
                    </div>
                    
                )) }
            </div>
        </section>
    )
}

export default React.memo(ProbabilityToRecommend);