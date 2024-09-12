import React from "react";
import Navigation from "../Navigation/Navigation";
import { Button } from "@mui/material";
import './style.css'

const Header: React.FC = () => {
    return (
        <div className="header">
            < Navigation />
            <Button variant="contained">Add new adv</Button>
        </div>
    )
}

export default Header;
