import React, { FC } from "react";
import styles from './CardFeedback.module.scss';
import cn from 'classnames';

import { IFeedbacks } from "../../../../../types";
import { useChangeSizeWindow } from "../../../../../hooks/useChangeSizeWindow";
import { useAccordion } from "../../../../../hooks/useAccordion";

import InfCustomer from "./inf-customer/InfCustomer";

const CardFeedback: FC<{ inf: IFeedbacks, addClass: boolean }> = ({ inf, addClass }) => {
    const size = useChangeSizeWindow();
    const { id, triggerAccordeon } = useAccordion('feedback', inf.id)

    return (
        <div className={cn(styles.card, {
            [styles.not_last_card]: !addClass
        })}>
            <div className={styles.title_block} onClick={() => { if (size <= 730) triggerAccordeon(); }}>
                <h1 className={cn(styles.title_feedback, 'textvmiddle_bold')}>{inf.title}</h1>
                { size <= 730 && <img src="../../../../../../img/arrow-down.svg" className={cn("ar_d_accordion", { 'ar_d_accordion_rotate': id === inf.id })} /> }
            </div>

            <div className={cn(styles.content, { [styles.content_active]: id === inf.id} )} data-accordion={`feedback-${inf.id}`}>
                <p className={cn(styles.text, 'textmiddle')}>{inf.text}</p>
                
                <InfCustomer inf={inf}/>
            </div>
        </div>
    )
}

export default React.memo(CardFeedback);