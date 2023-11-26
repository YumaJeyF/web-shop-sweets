import { useState, useEffect } from 'react';

export const useLoadPage = () => {
    const [ isLoadPage, setIsLoadPage ] = useState<boolean>(true);

    useEffect(() => {
      
    }, []);

    return isLoadPage;
}