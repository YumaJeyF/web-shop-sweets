import React, { FC } from "react";
import styles from './TitleSection.module.scss';

import FirstInf from './first-inf/FirstInf';
import TwoSections from '../../../ui/two-sections/TwoSections';

import { IHead } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import { getHeadInf } from '../../../../services/getHeadData';

const TitleSection: FC = () => {
    const { error, data } = useQuery<IHead>(['get-wholesale-supplies'], () => getHeadInf.get('mainHead'));

    if (error) throw new Error(`${error}`);
    
    return (
        <section className={styles.sec}>
            { data && 
                <TwoSections
                    FirstTopBlock={FirstInf}
                    inf={data} 
                    classContent={styles.head_block}
                    classDesktopPic={styles.pic_desktop}
                    classMobilePic={styles.pic_mobile}
                    classRightBlock={styles.right_block}
                />
            }
        </section>
    )
}

export default React.memo(TitleSection);