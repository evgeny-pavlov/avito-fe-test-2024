import React from "react";
import { Advertisment as AdvertisementType } from '../../../types';
import './style.css';
import { Link, useNavigate } from "react-router-dom";

const Advertisement: React.FC<AdvertisementType> = ({ id, name, description, price, createdAt, views, likes, imageUrl }) => {
    const navigate = useNavigate();

    const onLinkClick = () => {
        navigate(`/advertisements/${id}`);
    };

    return (
        <>
            <li className="adv-item" id={id} onClick={onLinkClick}>
                <img className="adv-item-img" src={imageUrl} alt="Image" />
                <div className="adv-item-row adv-item-row-spaced">
                    <p className="adv-item-name">{name}</p>
                    <div className="adv-item-likes adv-item-row">
                        <span className="material-icons adv-item-icon-like">
                            favorite
                        </span>
                        {likes}
                    </div>
                </div>
                <div>{price} ₽</div>
                <div>{views} просмотров</div>
            </li>

        </>
    );
}

export default Advertisement;
