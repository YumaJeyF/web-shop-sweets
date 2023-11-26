import React, { Dispatch, FC, SetStateAction } from "react";
import styles from './IconPassword.module.scss';

const IconPassword: FC<{ isHidden: boolean, setIsHidden: Dispatch<SetStateAction<boolean>> }> = ({ isHidden, setIsHidden }) => {
    return (
        <img
            className={styles.icon_password}
            src={ isHidden ? '../../../../../img/icon-hide.png' : '../../../../../img/icon-eye.png' }
            onClick={() => setIsHidden((prev: boolean) => !prev)}
        />
    )
}

export default React.memo(IconPassword);