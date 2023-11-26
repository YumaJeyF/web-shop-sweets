import React, { FC } from "react";
import styles from './LeftBlock.module.scss';
import cn from 'classnames';
import '../Select.scss';
 
import { useQuery } from "@tanstack/react-query";
import { useActions } from "../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useChangeSizeWindow } from "../../../../../../hooks/useChangeSizeWindow"; 

import Select, { OnChangeValue } from 'react-select';

import { IOptionSelect } from "../../../../../../types";
import { options } from './optionsForSelect';

import { getInfForAssembleSets } from "../../../../../../services/getInfForAssembleSets";

import CardImage from "./card-image/CardImage";
import LoadImages from "../load-images/LoadImages";

const LeftBlock: FC<{ openCropImage: () => void, openText: () => void }> = ({ openCropImage, openText }) => {
    const { changeTheme } = useActions();
    const { dataThemes, customData } = useAppSelector(state => state.assembleSets);
    const size = useChangeSizeWindow();

    const { data, error, isLoading } = useQuery<string[]>(['get-data-images'], () => getInfForAssembleSets.getImages());

    if (isLoading) return <img src="../../../../../../../img/loading.gif" alt="Идёт загрузка..." className="icon_loading"/>
    if (error) throw new Error(`${error}`);

    return (
        <section className={styles.sec}>
            {
                size <= 730 && 
                <div className={styles.loading_inf}>
                    <h2 className={cn(styles.title, 'textmini')}>Выбранные изображения</h2>
                    <div className={styles.data}>
                        <div className={styles.icons}>
                            <img src="../../../../../../../img/load-image.svg" alt="добавить картинку" className={styles.icon} onClick={openCropImage} id="mobile-crop-image"/>
                            <img src="../../../../../../../img/load-text.svg" alt="добавить картинку" className={styles.icon} onClick={openText} id="mobile-text"/>
                        </div>
                        <LoadImages/>
                    </div>
                </div>
            }

            <Select
                placeholder='Темы'
                isMulti
                name="colors"
                defaultValue={dataThemes.length > 0 ? dataThemes.map((theme: IOptionSelect) => theme) : undefined}
                options={options}
                closeMenuOnSelect={false}
                className='select-images'
                classNamePrefix='select'
                isSearchable={false}
                onChange={(newValue: OnChangeValue<IOptionSelect, boolean>) => changeTheme(newValue as IOptionSelect[])}
            />

            <div className={styles.catalog}>{ data && data.length > 0 && data.map((image: string, index: number) => <CardImage image={image} key={index}/>) }</div>
        </section>
    )
}

export default React.memo(LeftBlock);