import React, { FC } from "react";
import styles from './RightBlock.module.scss';
import cn from 'classnames';

import '../../../AssembleSets.scss';

import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useChangeSizeWindow } from '../../../../../../hooks/useChangeSizeWindow';

import LoadInf from './load-inf/LoadInf';
import LoadImages from '../load-images/LoadImages';
import BtnBlue from "../../../../../ui/btn-blue/BtnBlue";

import { useActions } from "../../../../../../hooks/useActions";

const RightBlock: FC<{ openCropImage: () => void, openText: () => void }> = ({ openCropImage, openText }) => {
    const { customData, quantity } = useAppSelector(state => state.assembleSets);
    const { setStageName } = useActions();
    const size = useChangeSizeWindow();

    return (
        <section className={cn('inf-right', styles.sec)}>
            <div>
                <p className={cn('count textvmiddle_bold')}>{customData.images ? customData.images.length : 0} из {quantity} шт.</p>
                { size <= 730 && <p className={cn(styles.bottom_text, 'textmini text')}>Для продолжения количество картинок должно равняться <span style={{ fontWeight: 600 }}>{quantity} шт.</span> Ещё нужно выбрать тему и написать свой текст.</p>  }
            </div>
            
            {
                size > 730 && 
                <>
                    <div className={cn(styles.images, 'middle', { 'middle_empty': !customData.images || (customData.images && customData.images.length === 0) })}><LoadImages/></div>
                    <LoadInf openCropImage={openCropImage} openText={openText}/>
                </>
            }
            <div className={cn(styles.bottom, 'bottom')}>
                { size > 730 && <p className={cn(styles.bottom_text, 'textmini text')}>Для продолжения количество картинок должно равняться <span style={{ fontWeight: 600 }}>{quantity} шт.</span> Ещё нужно выбрать тему и написать свой текст.</p> }
            
                <BtnBlue
                    condition={
                        customData.images?.length !== quantity ||
                        (customData.themes.length === 1 && customData.themes.includes('Кастомный')) ||
                        customData.color === '' || customData.customText === '' || customData.fontName === ''
                    }
                    className={cn("btn", styles.btn)} 
                    name="ДАЛЕЕ"
                    onClick={() => setStageName('additionally')}
                />
            </div>
        </section>
    )
}

export default React.memo(RightBlock);