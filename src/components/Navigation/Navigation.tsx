import React from "react";
import { Link } from "react-router-dom";
import { routePaths } from "../../router/consts";
import './style.css';

const Navigation: React.FC = () => {
    return (
        <nav className="menu">
            <Link to={routePaths.advertisements}>Объявления</Link>
            <Link to={routePaths.orders}>Заказы</Link>
        </nav>
    )
}

export default Navigation;