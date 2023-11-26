import React, { FC } from 'react';
import styles from './AnswersToQuestions.module.scss';
import cn from 'classnames';

import Question from './question/Question';

import { ArrQuestion } from '../../../types';
import { TQuestion } from '../../../types';

const AnswersToQuestions: FC<{ data: ArrQuestion[], classSection: string }> = ({ data, classSection }) => {

    return (
        <section className={cn(styles.sec, classSection )}>
            <h1 className={cn('titlemain', styles.title)}>Ответы на вопросы</h1>

            <div className={styles.questions}>
                {
                    data && data.length > 0 && data.map((blocks: ArrQuestion) => (
                        <div className={styles.block} key={data.indexOf(blocks)}>
                            { blocks && blocks.length > 0 && blocks.map((inf: TQuestion) =>
                                <Question
                                    inf={inf}
                                    key={inf.id}
                                    addClass={data.indexOf(blocks) + 1 === data.length && blocks.indexOf(inf) + 1 === blocks.length}
                                />
                            )}
                        </div>
                    )).slice(0, 3)
                }
            </div>
        </section>
    )
}

export default React.memo(AnswersToQuestions);