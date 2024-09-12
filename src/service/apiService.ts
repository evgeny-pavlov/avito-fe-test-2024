import { Advertisment as AdvertisementType } from '../../types';

export const fetchAdvertisements = async (url: string): Promise<AdvertisementType[]> => {
    try {
        const response = await fetch(`http://localhost:3000${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            
        });

        if (!response.ok) {
            throw new Error('Failed to fetch advertisements');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error');
        }
    }
};
