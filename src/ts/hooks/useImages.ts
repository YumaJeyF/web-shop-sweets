import { images } from "../services/getImages";
import { useQuery } from '@tanstack/react-query';

export const useImages = () => {
    const { error, data, isLoading } = useQuery(['imagesBack'], () => images.getAll());

    if (isLoading) return; 
    if (error) return;

    return data;
}
