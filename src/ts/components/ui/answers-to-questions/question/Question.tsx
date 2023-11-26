import React, { FC } from "react";
import styles from './Question.module.scss';
import cn from 'classnames';

import { TQuestion } from "../../../../types";
import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";
import { useAccordion } from "../../../../hooks/useAccordion";

const Question: FC<{ inf: TQuestion, addClass: boolean }> = ({ inf, addClass }) => {
    const { id, triggerAccordeon } = useAccordion('question', inf.id);
    const size = useChangeSizeWindow();

    return (
        <div className={cn(styles.question, { [styles.not_last_question]: !addClass })}>
            <div className={styles.block} onClick={() => { if (size <= 730) triggerAccordeon(); }}>
                <h2 className={cn('textvmiddle_bold', styles.title)}>{inf.title}</h2>
                { size <= 730 && <img src="../../../../../../img/arrow-down.svg" className={cn("ar_d_accordion", { "ar_d_accordion_rotate": id === inf.id })}/> }
            </div>
            <div className={cn(styles.content, {[styles.content_active]: id === inf.id})} data-accordion={`question-${inf.id}`}>
                <p id={`${inf.id}`} className={cn('textmiddle', styles.text)}>{inf.text}</p>
            </div>
        </div>
    )
}

export default React.memo(Question);