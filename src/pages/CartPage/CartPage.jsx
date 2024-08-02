import React from 'react'
import "./CartPage.scss";
import { useSelector, useDispatch } from 'react-redux';
import { shopping_cart  } from '../../utils/images';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { getAllCarts, removeFromCart, toggleCartQty, clearCart, getCartTotal } from '../../store/cartSlice';


const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const {itemsCount, totalAmount} = useSelector((state) => state.cart);

  if(carts.length === 0){
    return (
      <div className='container my-5'>
        <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
          <img src={shopping_cart} alt="" />
          <span className='fw-6 fs-15 text-gray'>Your shopping cart is empty.</span>
          <Link className='shopping-btn bg-orange text-white fw-5' to="/">Go to shopping now</Link>
        </div>
      </div>
    )
  }
  return (
    <div className='cart bg-whitesmoke'>
      <div className='container'>
        <div className='cart-ctable'>
          <div className='cart-chead bg-white'>
            <div className='cart-ctr fw-6 font-manrope fs-15'>
              <div className='cart-cth'>
                <span className='cart-ctxt'>S.N.</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Product</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Unit Price</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Quantity</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Total Price</span>
              </div>
              <div className='cart-cth'>
                <span className='cart-ctxt'>Actions</span>
              </div>

            </div>
          </div>
          <div className='cart-cbody bg-white' key={carts?.id}>
            {
              carts.map((cart, index) => {
                return (
                  <div className='cart-ctr py-4' key={cart?.id}>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{index + 1}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{cart?.title}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{formatPrice(cart?.discountedPrice)}</span>
                    </div>
                    <div className='cart-ctd'>
                      <div className='qty-change flex align-center'>
                        <button type='button' className='qty-decrease flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "DEC"}))}>
                          <i className='fas fa-minus'></i>
                        </button>

                        <div className='qty-value flex align-center justify-center'>
                          {cart?.quantity}
                        </div>

                        <button type='button' className='qty-increase flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "INC"}))}>
                          <i className='fas fa-plus'></i>
                        </button>
                      </div>
                    </div>

                    <div className='cart-ctd'>
                      <span className='cart-ctxt text-orange fw-5'>
                        {formatPrice(cart?.totalPrice)}
                      </span>
                    </div>
                    <div className='cart-ctd'>
                      <button className='cart-ctxt text-orange fw-5' onClick={() => dispatch (removeFromCart(cart?.id))}>
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage