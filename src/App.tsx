import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdvertisementsPage from './pages/AdvertisementsPage/AdvertisementsPage';
import { Orders } from './pages/Orders';
import { routePaths } from './router/consts';
import { DefaultLayout } from './pages/Layout/DefaultLayout';
import { AdvertisementDetailPage } from './pages/AdvertisementDetail';

import "./style.css";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index path={routePaths.advertisements} element={<AdvertisementsPage />} />
                    <Route path={routePaths.orders} element={<Orders />} />
                    <Route path={routePaths.advertisement} element={<AdvertisementDetailPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
