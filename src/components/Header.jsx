import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import "../components/CSS/Header.css"
import { StickerCartContext } from '../contexts/stickerCartContext';


const Header = () => {
    const { basket, setBasket } = useContext(StickerCartContext)
    return (
        <>
            <header>
                <div className="container">
                    <NavLink to="/">
                        <h1>
                            <img src="https://doggystickers.vercel.app/icon.svg" alt="Logo" />
                            <span>Doggy Stickers</span>
                        </h1>
                    </NavLink>

                    <NavLink to="cart" className="basket-icon">
                        <FaShoppingCart />
                        {basket.length > 0 && <span className="badge">{basket.length}</span>}
                    </NavLink>
                </div>
            </header>
        </>
    )
}

export default Header