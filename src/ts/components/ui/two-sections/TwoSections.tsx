import React, { FC } from "react";
import styles from './TwoSections.module.scss';
import cn from 'classnames';

import { IHead } from "../../../types";
import TopLinkInfPages from "../top-link-inf-pages/TopLinkInfPages";
import { useChangeSizeWindow } from "../../../hooks/useChangeSizeWindow";

const TwoSections: FC<{
    FirstTopBlock: FC<{ title: string, text: string }>,
    SecondTopBlock?: FC<{ texts: string[] }>,
    inf: IHead,
    classContent: string,
    nameLink?: string,
    classDesktopPic: string,
    classMobilePic: string,
    classRightBlock: string
}> = ({
    FirstTopBlock,
    SecondTopBlock,
    inf,
    classContent,
    nameLink,
    classDesktopPic,
    classMobilePic,
    classRightBlock,
}) => {
    const size = useChangeSizeWindow();

    return (
        <section className={styles.sections} style={{ backgroundImage: size > 670 ? `url(${inf.pictures.backgroundDesktop})` : ''}}>
            { nameLink && <TopLinkInfPages name={nameLink}/> }
            <section className={cn(styles.blocks_inf, `${classContent}`)}>
                { size > 670 && <div className={cn(styles.pic, `${classDesktopPic}`)} style={{ backgroundImage: `url(${inf.pictures.image})` }}></div> }

                <div className={cn(styles.right_block, `${classRightBlock}`)}>
                    <FirstTopBlock title={inf.title} text={inf.firstInf}/>
                    { size <= 670 && <div className={`${classMobilePic}`} style={{ margin: 'auto' }}><img src={inf.pictures.image} className={styles.pic_mobile}/></div> }
                    { SecondTopBlock && <SecondTopBlock texts={inf.secondInf}/> }
                </div>
            </section>
        </section>
    )
}

export default React.memo(TwoSections);