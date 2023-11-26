import React, { FC } from "react";
import styles from './LoadImages.module.scss';
import cn from 'classnames';

import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useActions } from "../../../../../../hooks/useActions";

import LoadableImage from "../../../../../ui/LoadableImage/LoadableImage";

const LoadImages: FC = () => {
    const { customData } = useAppSelector(state => state.assembleSets);
    const { removeImage } = useActions();

    return (
        <div className={styles.images}>
            { customData.images && customData.images.length > 0 && customData.images.map((image: string, index: number) => (
                <div className={styles.image} key={index}>
                    <div className={styles.pic}>
                        <LoadableImage src={image}/>
                    </div>
                    <div className={styles.icon_close} onClick={() => removeImage(image)}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9.70153" cy="9.58752" r="9.10778" fill="black" fillOpacity="0.5"/>
                            <path d="M14.2543 6.10683L13.181 5.03359L9.70036 8.51423L6.21973 5.03359L5.14648 6.10683L8.62712 9.58747L5.14648 13.0681L6.21973 14.1414L9.70036 10.6607L13.181 14.1414L14.2542 13.0681L10.7736 9.58747L14.2543 6.10683Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            )) }
        </div>
    )
}

export default React.memo(LoadImages);