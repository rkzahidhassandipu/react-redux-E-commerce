import React from 'react';
import { correct } from '../../utils/images';
import "./CartMessage.scss";

const CartMessage = () => {
  return (
    <div className='cart-message text-center'>
        <div className='cart-message-icon'>
            <img src={correct} alt="" />
        </div>
        <h5 className='text-white fs-14 fw-5'>An item has been added to your shopping cart</h5>
    </div>
  )
}

export default CartMessage