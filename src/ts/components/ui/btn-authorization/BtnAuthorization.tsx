import React, { FC } from "react";
import cn from "classnames";

const BtnAuthorization: FC<{
    loading: boolean
    customClass: string
    conditionActive: boolean
    nameBtn: string
    onClick?: () => void
    preventDefault?: boolean
}> = ({
    loading,
    customClass,
    conditionActive,
    nameBtn,
    onClick,
    preventDefault
}) => {
    return (
        <button type="submit" className={cn(customClass, 'red_btn_form btn_m', { 'red_btn_form_disabled': conditionActive })} onClick={(e: React.MouseEvent) => {
            if (preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (onClick) onClick();
        }}>
            { loading ? <img src="../../../../img/loading.gif" className='loading_m'/> : nameBtn }
        </button>
    )
}

export default React.memo(BtnAuthorization);