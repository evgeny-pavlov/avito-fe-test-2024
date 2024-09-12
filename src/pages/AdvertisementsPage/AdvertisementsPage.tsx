import React, { useEffect, useMemo, useState, useCallback } from "react";
import Advertisement from "../../components/Advertisement/Advertisement";
import { Advertisment as AdvertisementType } from '../../../types';
import { fetchAdvertisements } from "../../service/apiService";
import './style.css';
import { FormControl, InputLabel, MenuItem, Pagination, Select, Input } from "@mui/material";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { routePaths } from "../../router/consts";
import debounce from "lodash.debounce";

const searchParam = "name";
const limitParam = "_limit";
const pageParam = "_start";

const AdvertisementsPage: React.FC = () => {
    const [advertisements, setAdvertisements] = useState<AdvertisementType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [query] = useSearchParams();
    const navigate = useNavigate();

    const limit = useMemo(() => parseInt(query.get(limitParam) || "10"), [query]);
    const currentPage = useMemo(() => parseInt(query.get(pageParam) || "1"), [query]);
    const search = useMemo(() => query.get(searchParam) || "", [query]);

    const maxPage = useMemo(() => {
        const maxLength = 8;
        return Math.ceil(maxLength / limit);
    }, [limit]);

    const getOffset = (page: number, limit: number) => {
        return (page - 1) * limit;
    };

    const onLimitSelect = (newLimit: string) => {
        navigate({
            pathname: routePaths.advertisements,
            search: createSearchParams({
                [searchParam]: search,
                [limitParam]: newLimit,
                [pageParam]: "1",
            }).toString(),
        });
    };

    const onPageSelect = (newPage: number) => {
        navigate({
            pathname: routePaths.advertisements,
            search: createSearchParams({
                [searchParam]: search,
                [limitParam]: limit.toString(),
                [pageParam]: newPage.toString(),
            }).toString(),
        });
    };

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            navigate({
                pathname: routePaths.advertisements,
                search: createSearchParams({
                    [searchParam]: searchTerm,
                    [limitParam]: limit.toString(),
                    [pageParam]: "1",
                }).toString(),
            });
        }, 300),
        [navigate, limit]
    );

    const requestAds = async () => {
        const offset = getOffset(currentPage, limit);
        const queryString = "?" + createSearchParams({
            [searchParam]: search,
            [limitParam]: limit.toString(),
            [pageParam]: offset.toString(),
        }).toString();

        try {
            const ads = await fetchAdvertisements(`${routePaths.advertisements}${queryString}`);
            setAdvertisements(ads);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Unknown error');
            }
        }
    };

    useEffect(() => {
        requestAds();
    }, [query]);

    const ads = advertisements.map((item) => (
        <Advertisement
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            createdAt={item.createdAt}
            views={item.views}
            likes={item.likes}
            imageUrl={item.imageUrl}
        />
    ));

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Input
                type="search"
                placeholder="search of advertisements"
                onChange={(e) => debouncedSearch((e.target as HTMLInputElement).value)}
            />
            <ul className="advs-list">
                {ads}
            </ul>
            <div className="pagination">
                <Pagination
                    page={currentPage}
                    count={maxPage}
                    color="primary"
                    onChange={(e, p) => onPageSelect(p)}
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Выводить по:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={limit.toString()}
                        label="Выводить по:"
                        onChange={(e) => onLimitSelect(e.target.value)}
                    >
                        <MenuItem value={"10"}>10</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    );
};

export default AdvertisementsPage;
