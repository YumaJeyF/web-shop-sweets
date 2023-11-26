import React, { FC, ChangeEventHandler, useState, useEffect } from "react";
import styles from './LoadInf.module.scss';
import cn from 'classnames';

import { useActions } from "../../../../../../../hooks/useActions";
import { useOpenSaveModal } from "../../../../../../../hooks/useOpenSaveModal";

const LoadInf: FC<{ openText: () => void, openCropImage: () => void }> = ({ openText, openCropImage }) => {
    const { setCustomImage } = useActions();

    return (
        <div className={styles.load}>
            <label htmlFor="add-image" style={{ cursor: 'pointer' }}>
                <input type="file" id="add-image" className={styles.inp} accept='.png,.jpg,.jpeg,.webp'
                
                    onChange={({ target: { files } }) => {
                        if (files && files[0]) {
                            // setCustomImage(URL.createObjectURL(files[0]));
                            const reader = new FileReader();

                            reader.readAsDataURL(files[0]);
                            reader.addEventListener('load', () => setCustomImage(reader.result?.toString() || ''));
                            openCropImage();
                        }
                    }}
                />
                <img src="../../../../../../../../img/load-image.svg" className={styles.icon}/>
    
                <p className={cn('textmini blue', styles.text)}>Загрузить с компьютера</p>
                
            </label>
            <button className={cn(styles.btn, 'main_button')} onClick={() => openText()} id="add-text">Ввести текст</button>
        </div>
    )
}

export default React.memo(LoadInf);