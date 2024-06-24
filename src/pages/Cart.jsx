// src/Cart.js
import React, { useContext, useEffect, useState } from 'react';
import { StickerCartContext } from '../contexts/stickerCartContext';
import { IoTrashBin } from "react-icons/io5";
import './CSS/Cart.css';




const Cart = () => {
  const { basket, setBasket } = useContext(StickerCartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  function deleteFromCart(ID) {
    console.log("Deleting item with ID:", ID);
    setBasket(prevBasket => {
      const newBasket = prevBasket.filter(element => element.id !== ID);
      console.log("New basket after deletion:", newBasket);
      return newBasket;
    });
  }

  function getTotal() {
    const total = basket.reduce(
      (acc, currentValue) => acc + currentValue.price * currentValue.quantity, 0
    );
    setTotalPrice(total);
  }

  useEffect(() => {
    getTotal();
  }, [basket]);

  return (
    <div id='cart'>
      <div className="container">
        <div className='cartBody'>
          <h1 className='cartBodyTitle'>Your Cart</h1>
          <table className="mx-auto">
            <thead>
              <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
                <th className="font-primary font-normal px-6 py-4">Product</th>
                <th className="font-primary font-normal px-6 py-4">Quantity</th>
                <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">Price</th>
                <th className="font-primary font-normal px-6 py-4">Remove</th>
              </tr>
            </thead>
            <tbody>
              {basket?.map((item, index) => {
                let sizeIndex;
                item?.item?.variants?.edges?.forEach((element, indexEdges) => {
                  if (item.size === element.node.title) {
                    sizeIndex = indexEdges;
                  }
                });
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.item.images.edges[0].node.originalSrc} alt={item.item.title} height="64" width="64" className="hidden sm:inline-flex" />
                      <a>{item.item.title} {item.size}</a>
                    </td>
                    <td>
                      <input type="number" inputMode="numeric" value={item.quantity} readOnly />
                    </td>
                    <td>
                      $<span>{item.item.variants.edges[sizeIndex].node.price}</span>
                    </td>
                    <td>
                      <button onClick={() => { deleteFromCart(item.id) }} aria-label="delete-item">
                        <IoTrashBin />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="cartFoot">
            <h2 className='cartBodyTitle'>Total price: ${totalPrice}</h2>
            <a className='checkOutBtn' href="https://mpay.az/">   <button >Pay</button></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
