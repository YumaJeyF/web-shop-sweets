import React, { FC } from "react";
import styles from './BtnClose.module.scss';
import cn from 'classnames';

const BtnClose: FC<{ customClass: string, onClick: () => void, classPath?: string }> = ({ customClass, onClick, classPath }) => {
    return (
        <button className={cn(styles.btn_close, customClass)} onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            onClick();
        }}>
            <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={classPath ? classPath : ''} d="M12 1.41405L10.5859 0L5.99998 4.58593L1.41405 0L0 1.41405L4.58593 5.99998L0 10.5859L1.41405 12L5.99998 7.41407L10.5859 12L12 10.5859L7.41407 5.99998L12 1.41405Z" fill="#FFFFFF69"/>
            </svg>
        </button>
    )
}

export default React.memo(BtnClose);