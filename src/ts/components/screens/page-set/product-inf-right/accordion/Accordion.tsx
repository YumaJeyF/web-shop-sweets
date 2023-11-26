import React, { FC, useRef, useState } from 'react';
import styles from './Accordion.module.scss';

import TastesContent from '../tastes/tastes-content/TastesContent';
import TabTexts from '../tabs/tab-texts/TabTexts';
import AccordionItem from './accordionItem/AccordionItem';

import { ISet } from '../../../../../types';

const Accordion: FC<{ data: ISet }> = ({ data }) => {
    const [ idOpen, setIdOpen ] = useState<number | null>(null);
    const content = useRef<Element>();

    const openContent = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const numberAccordeon: number | undefined = Number(e.currentTarget.dataset.number);
        const accContent: Element | null = e.currentTarget.nextElementSibling;

        if (numberAccordeon && accContent) {
            if (numberAccordeon != idOpen) setIdOpen(numberAccordeon);
            else setIdOpen(null);

            content.current = accContent;
        }
    }
    
    return (
        <section className={styles.accordeon}>
            <AccordionItem 
                idOpen={idOpen}
                openContent={openContent}
                content={content.current}
                component={<TastesContent tastes={data.tastes}/>}
                nameButton='Вкусы'
                id='1'
            />
            <AccordionItem 
                idOpen={idOpen}
                openContent={openContent}
                content={content.current}
                component={<TabTexts texts={data.compositionNutritional}/>}
                nameButton='Состав и пищевая ценность'
                id='2'
            />
            <AccordionItem 
                idOpen={idOpen}
                openContent={openContent}
                content={content.current}
                component={<TabTexts texts={data.conditionsAndShelfLife}/>}
                nameButton='Условия и срок хранения'
                id='3'
            />
        </section>
    )
}

export default React.memo(Accordion);