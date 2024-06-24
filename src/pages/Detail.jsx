import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './CSS/Detail.css';
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { StickerCartContext } from '../contexts/stickerCartContext';
import Swal from 'sweetalert2';

const Detail = () => {
    const title = useParams().id.toLowerCase().replace(/\s+/g, '-');
    const [size, setSize] = useState(0);
    const [chosedItem, setChoosedItem] = useState({});

    function getDetail() {
        fetch(`https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/products/${title}.json`)
            .then(res => res.json())
            .then(data => setChoosedItem(data));
    }

    useEffect(() => {
        getDetail();
    }, []);

    const { basket, setBasket } = useContext(StickerCartContext);
    const quantity = document.getElementById("quantity");

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket));
    }, [basket]);

    function addToBasket() {
        let sticker = basket.find((element) => 
            element.item.id === chosedItem?.pageProps?.productData?.id &&
            element.size === chosedItem?.pageProps?.productData?.variants?.edges[size]?.node?.title
        );
        if (!sticker) {
            setBasket([...basket, {
                item: chosedItem?.pageProps?.productData,
                quantity: quantity.value,
                size: chosedItem?.pageProps?.productData?.variants?.edges[size]?.node?.title,
                id:chosedItem?.pageProps?.productData?.variants?.edges[size]?.node?.id,
                price:chosedItem?.pageProps?.productData?.variants?.edges[size]?.node?.price
            }]);
            Swal.fire({
                title: 'Added to Cart',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'This item is already in your cart!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <div id='detail'>
            <div className="container">
                <div className='detailCard'>
                    <div className='detailImg'>
                        <img src={chosedItem?.pageProps?.productData?.images?.edges[0]?.node?.originalSrc} alt="" />
                        <div className='noWrap'>
                            {chosedItem?.pageProps?.productData?.images?.edges.map(item => (
                                <img src={item.node?.originalSrc} alt="" />
                            ))}
                        </div>
                    </div>
                    <div className='detailArticle'>
                        <NavLink to="/">
                            <FaArrowLeft />
                            Back To All Products
                        </NavLink>

                        <div className='detailArticleBody'>
                            <h1>{chosedItem?.pageProps?.productData?.title}</h1>
                            <p>{chosedItem?.pageProps?.productData?.description}</p>
                            <span>$ {chosedItem?.pageProps?.productData?.variants?.edges[size]?.node?.price}</span>
                            <form action="">
                                <div className="detailFormItem">
                                    <label htmlFor="">Qty.</label>
                                    <input type="number" defaultValue={1} id='quantity' />
                                </div>

                                <div className='detailFormItem'>
                                    <label htmlFor="">Size</label>
                                    <select onChange={(e) => { setSize(e.target.value) }}>
                                        {chosedItem?.pageProps?.productData?.variants?.edges.map((item, index) => (
                                            <option value={index}>{item.node.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                            <button onClick={addToBasket}>Add To Cart<FaShoppingCart /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
