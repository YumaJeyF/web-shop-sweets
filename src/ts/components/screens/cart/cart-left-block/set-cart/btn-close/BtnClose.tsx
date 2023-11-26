import React, { FC } from "react";
import styles from './BtnClose.module.scss';

import { useActions } from "../../../../../../hooks/useActions";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useMutation } from "@tanstack/react-query";

import { changeCart } from "../../../../../../services/changeCart";

const BtnClose: FC<{ isCheapGoods: boolean, id: number }> = ({ isCheapGoods, id }) => {
    const { removeItem, setIsFetch } = useActions();
    const { isLogin, userId } = useAppSelector(state => state.user);

    const mutation = useMutation(() => changeCart.deleteProduct(userId, id), { onSuccess() { setIsFetch(true) } });

    return (
        <>
            { 
                !isCheapGoods && 
                <button className={styles.btn_close} onClick={() => isLogin ? mutation.mutate() : removeItem(id)}>
                    <svg className={styles.svg_close} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={styles.svg_path} d="M16 1.88541L14.1146 0L7.99998 6.11457L1.88541 0L0 1.88541L6.11457 7.99998L0 14.1146L1.88541 16L7.99998 9.88543L14.1146 16L16 14.1146L9.88543 7.99998L16 1.88541Z" fill="#292929" fillOpacity="0.20"/>
                    </svg>
                </button>
            }
        </>
    )
}

export default React.memo(BtnClose);