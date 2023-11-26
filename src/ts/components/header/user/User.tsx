import React, { FC, useState } from "react";
import styles from './User.module.scss';
import cn from 'classnames';

import { useAppSelector } from "../../../hooks/useAppSelector";
import { useActions } from "../../../hooks/useActions";
import { useModal } from "../../../hooks/useModal";
import { useOpenSaveModal } from "../../../hooks/useOpenSaveModal";
import { useClickOutside } from "../../../hooks/useClickOutside";

import Authorization from "../authorization/Authorization";
import NotifyStateUser from "../../ui/notify-state-user/NotifyStateUser";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/getUser";

const User: FC = () => {
    const [ isVisible, setIsVisible ] = useState<boolean>(sessionStorage.getItem('authorization') ? true : false);
    const { isLogin, userId } = useAppSelector(state => state.user);
    const { setTextNotify, setNameForm, setIsNextPage, setUserFoundId, removeUser, setCartItems } = useActions();
    const { openModal, closeModal } = useOpenSaveModal('authorization', setIsVisible);

    const newCloseModalFn = () => {
        setNameForm('login');
        setIsNextPage(false);
        setUserFoundId(0);
        closeModal();
    } 

    useModal(isVisible);
    useClickOutside('#entry-form', 'active', () => newCloseModalFn(), '#btn-login');

    useQuery<string | null>(['get-status-user'], () => {
        if (userId !== '') return getUser.getUserForCheckId(userId);
        else return null;
    }, {
        onSuccess(userData) {
            if (userData && userData === 'user not found') removeUser();
        }
    });

    return (
        <>
            <button
                className={cn('textmini', styles.btn)} id='btn-login'
                onClick={() => {
                    if (!isLogin) openModal();
                    else {
                        removeUser();
                        setCartItems([]);
                        setTextNotify('Вы вышли из аккаунта');
                    }
                }}
            >
                { isLogin ? 'Выйти' : 'Войти' }
            </button>

            <Authorization closeModal={newCloseModalFn} isVisible={isVisible}/>
            <NotifyStateUser/>
        </>
    )
}

export default React.memo(User);