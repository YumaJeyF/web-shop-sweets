import React, { FC, useRef } from "react";
import styles from './Map.module.scss';
import { useOnScreen } from "../../../../hooks/useOnScreen";

const Map: FC = () => {
    const map = useRef<HTMLElement>(null);
    const isVisible = useOnScreen(map);

    return (
        <section ref={map} className={styles.sec_map}>
            {
                isVisible &&
                
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                   <a href="https://yandex.ru/maps/org/sova/1218163203/?utm_medium=mapframe&utm_source=maps"style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Сова</a>
                   <a href="https://yandex.ru/maps/2/saint-petersburg/category/business_center/184107509/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee' ,fontSize: '12px', position: 'absolute', top: '14px' }}>Бизнес-центр в Санкт‑Петербурге</a>
                    <iframe src="https://yandex.ru/map-widget/v1/org/sova/1218163203/?ll=30.416991%2C59.972091&z=17" className={styles.map} frameBorder={1} allowFullScreen={true} style={{ position: 'relative' }}></iframe>
                </div>
            }
        </section>
    )
}

export default React.memo(Map);