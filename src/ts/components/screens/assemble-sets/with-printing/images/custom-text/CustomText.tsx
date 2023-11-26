import React, { ChangeEvent, FC, useState } from "react";
import styles from './CustomText.module.scss';
import generalStyles from '../Images.module.scss';
import cn from 'classnames';

import { useModal } from "../../../../../../hooks/useModal";
import { useClickOutside } from "../../../../../../hooks/useClickOutside";
import { colors } from './colors';
import { useActions } from "../../../../../../hooks/useActions";
import { options } from './options';
import { IOptionSelect } from "../../../../../../types";

import BtnClose from "../../../../../ui/btn-close/BtnClose";
import BtnBlue from "../../../../../ui/btn-blue/BtnBlue";
import Color from './color/Color';
import Select, { OnChangeValue } from 'react-select';

const CustomText: FC<{ isVisible: boolean, closeModal: () => void }> = ({ isVisible, closeModal }) => {
    useModal(isVisible);
    useClickOutside('#modal-text', 'active', () => closeModal(), '#add-text', '.select__menu', '#mobile-text');

    const [ activeColor, setActiveColor ] = useState<string>('');
    const [ areaValue, setAreaValue ] = useState<string>('');
    const [ fontName, setFontName ] = useState<string>('');
    const { setDataText, setTextNotify } = useActions();

    return (
        <section className={cn('modal_c_default', { 'modal_c_default_active': isVisible })}>
            <div className={cn('modal_content', generalStyles.content, styles.content, { 'active': isVisible })} id="modal-text">
                <BtnClose classPath={generalStyles.btn_path} customClass={generalStyles.btn_close} onClick={() => closeModal()}/>

                <div className={styles.content_inner}>
                    <h1 className={cn(styles.title, 'titlemain')}>Введите свой текст</h1>
                    <p className={cn(styles.text, styles.content_text, 'textmiddle')}>2-3 слова, до 20 символов. Стиль текста мы подберём под стилистику набора</p>

                    <textarea className={cn(styles.textarea, styles.content_text, 'textmiddle')} placeholder="Введите текст" maxLength={20}
                        style={{ fontFamily: fontName, color: activeColor }}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAreaValue(e.currentTarget.value)}
                    />

                    <Select
                        placeholder={'Выберите шрифт'}
                        name="name-font"
                        options={options}
                        className='select-images'
                        classNamePrefix='select'
                        isSearchable={false}
                        onChange={(newValue: OnChangeValue<IOptionSelect, boolean>) => setFontName((newValue as IOptionSelect).value) }
                    />

                    <div className={styles.colors}>
                        <p className={cn(styles.colors_name, styles.content_text, 'textmiddle')}>Цвет:</p>
                        <div className={styles.colors_catalog}>
                            { colors && colors.length > 0 && colors.map((color: string, index: number) =>
                                <Color key={index} color={color} activeColor={activeColor} setActiveColor={setActiveColor}/>
                            ) }
                        </div>
                    </div>

                    <BtnBlue condition={activeColor === '' || areaValue === '' || fontName === ''} name="ДОБАВИТЬ" className={cn(generalStyles.btn, styles.btn)}
                        onClick={() => {
                            setDataText({ text: areaValue, color: activeColor, fontName });
                            closeModal();
                            setTextNotify('Текст успешно добавлен')
                        }}
                    />
                </div>
            </div>
        </section>

    )
}

export default React.memo(CustomText);