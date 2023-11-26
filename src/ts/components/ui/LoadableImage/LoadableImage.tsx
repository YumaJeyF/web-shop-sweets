import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './LoadableImage.module.scss';
import cn from 'classnames';
import { useOnScreen } from '../../../hooks/useOnScreen';

import { ILoadableImage } from '../../../types';

export const LoadableImage: FC<ILoadableImage> = ({ src, alt='', onLoad = () => {}, isCreateDesign, isCrossed }) => {
    const [ imageLoaded, setImageLoaded ] = useState<boolean>(false);
    const refImage = useRef<HTMLImageElement | null>(null);
    const refContainer = useRef<HTMLDivElement | null>(null);
    const isVisible = useOnScreen(refContainer);

    const fnLoad = () => {
        setImageLoaded(true);
        onLoad();
    }

    useEffect(() => {
        if (!isVisible || imageLoaded) return;
        if (refImage.current) {
            refImage.current.onload = () => {
                fnLoad();
            }

            if (isCreateDesign && !imageLoaded) fnLoad();
            if (isCrossed && !imageLoaded) fnLoad();
        }
    }, [ isVisible, onLoad, imageLoaded, isCrossed ]);

    return (
        <div ref={refContainer} className={cn(styles.image_container, {
            [styles.image_container_loaded]: imageLoaded
        })}>
            {
                (isVisible || imageLoaded || isCrossed ) && <img ref={refImage} src={src} alt={alt} className={cn(styles.image, {
                    [styles.image_loaded]: imageLoaded
                })} />
            }
        </div>

    )
}

export default React.memo(LoadableImage);