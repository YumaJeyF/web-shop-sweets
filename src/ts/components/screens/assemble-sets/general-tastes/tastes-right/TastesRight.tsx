import React, { FC } from "react";
import cn from 'classnames';

import '../../AssembleSets.scss';

import { TastesObj } from "../../../../../types";
import { useAppSelector } from "../../../../../hooks/useAppSelector";
import { useActions } from "../../../../../hooks/useActions";
import { useChangeSizeWindow } from "../../../../../hooks/useChangeSizeWindow";

import InfAboutTaste from './inf-about-taste/InfAboutTaste';

const TastesRight: FC<{ nextStageName: string }> = ({ nextStageName }) => {
    const { customData, quantity, countTastes } = useAppSelector(state => state.assembleSets);
    const { setStageName } = useActions();
    const size = useChangeSizeWindow();

    return (
        <section className='inf-right'>
            <div>
                <p className='textvmiddle_bold count'>{countTastes} из {quantity} шт. <span className="red">{customData.price} руб.</span></p>
                { size <= 730 && <p className='textmini text'>Для продолжения количество макарон должно равняться {quantity} шт.</p> }
            </div>
            {
                size > 730 &&
                <div className={cn('middle', { 'middle_empty': customData.tastes.length <= 0 })}>
                    { customData.tastes.length > 0 && customData.tastes.map((inf: TastesObj) => <InfAboutTaste name={inf.name} key={customData.tastes.indexOf(inf)}/>)}
                </div>
            }
            <div className='bottom'>
                { size > 730 && <p className='text textmini'>Для продолжения количество макарон должно равняться {quantity} шт.</p> }
                <button className={cn('btn red_btn_form', { 'red_btn_form_disabled': countTastes !== quantity })} onClick={() => {
                    if (countTastes === quantity) {
                        if (sessionStorage.getItem('assembleSetsResult')) sessionStorage.removeItem('assembleSetsResult');
                        setStageName(nextStageName);
                    }
                }}>Далее</button>
            </div>
        </section>
    )
}

export default React.memo(TastesRight);