import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAdvertisements } from "../../service/apiService";

export const AdvertisementDetailPage: React.FC = () => {
    const params = useParams();

    console.log(params);

    useEffect(() => {
        const { pathname, search } = document.location;
        fetchAdvertisements(`${pathname}${search}`);
    }, []);

    return <div>Detail Page id: {params.id}</div>;
};