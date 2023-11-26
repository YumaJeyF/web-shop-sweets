import React, { FC } from "react";
import Butttons from '../../../ui/buttons/Buttons';
import styles from './SecondHeadInf.module.scss';

const SecondHeadInf: FC<{ texts: string[] }> = ({ texts }) => {

    return (
        <div>
            <Butttons classBtns={styles.btns}/>
            <p className="textmiddle text_h_p" style={{ textAlign: 'left' }}>Мы предлагаем:</p>
            <ul>
                { texts && texts.length > 0 && texts.map((text: string) =>
                    <li className="textmiddle text_h_p" style={{ listStyle: 'inside', textAlign: 'left' }} key={texts.indexOf(text)}>{text}</li>).slice(0, 5)
                }
            </ul>
        </div>
    )
}

export default React.memo(SecondHeadInf);