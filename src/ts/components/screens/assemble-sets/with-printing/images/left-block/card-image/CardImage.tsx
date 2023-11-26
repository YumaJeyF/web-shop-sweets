import React, { FC } from "react";
import styles from './CardImage.module.scss';

import LoadableImage from "../../../../../../ui/LoadableImage/LoadableImage";
import ChangeCount from "../../../../change-count/ChangeCount";

import { useActions } from "../../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../../hooks/useAppSelector";

const CardImage: FC<{ image: string }> = ({ image }) => {
    const { addImage, removeImage } = useActions();
    const { customData } = useAppSelector(state => state.assembleSets);
    
    return (
        <div className={styles.card}>
            <div className={styles.pic}>
                <LoadableImage src={image} alt="picture" isCreateDesign={true}/>
            </div>
            <ChangeCount
                onClickDecrease={() => removeImage(image)}
                onClickIncrease={() => addImage(image)}
                count={customData.images && customData.images.includes(image) ? 1 : 0}
            />
        </div>
    )
}

export default React.memo(CardImage);