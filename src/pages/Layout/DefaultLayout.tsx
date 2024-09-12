import React, { useEffect } from "react";
import { Outlet, useNavigate, useRoutes } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./style.css";
import { routePaths } from "../../router/consts";

export const DefaultLayout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(routePaths.advertisements);
    }, []);

    return <div className="layout-default">
        <Header />
        <div className="layout-content">
            <Outlet />
        </div>
        <Footer />
    </div>;
};