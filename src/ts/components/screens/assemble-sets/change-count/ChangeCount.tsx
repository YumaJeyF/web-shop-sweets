import React, { FC } from "react";
import cn from 'classnames';

const ChangeCount: FC<{
    customClass?: string
    onClickDecrease: () => void
    onClickIncrease: () => void
    count: number
}> = ({
    customClass,
    onClickDecrease,
    onClickIncrease,
    count
}) => {
    return (
        <div className={cn('change_count', { [`${customClass}`]: customClass })} style={{ justifyContent: 'center', boxSizing: 'border-box' }}>
            <button id="btn-change-count"
                className='btn_change textvmiddle'
                onClick={onClickDecrease}
            >-</button>
            <span className='count_product textmiddle'>{count}</span>
            <button id="btn-change-count"
                className='btn_change textvmiddle'
                onClick={onClickIncrease}
            >+</button>
       </div>
    )
}

export default React.memo(ChangeCount);