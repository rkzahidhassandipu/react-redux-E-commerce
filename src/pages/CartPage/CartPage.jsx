import React, { useEffect } from 'react'
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

  useEffect(() => {
    dispatch(getCartTotal())
  }, [dispatch]);
  

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
                const {id, title, discountedPrice, quantity, totalPrice} = cart;
                
                return (
                  <div className='cart-ctr py-4' key={id}>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{index + 1}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{title}</span>
                    </div>
                    <div className='cart-ctd'>
                      <span className='cart-ctxt'>{formatPrice(discountedPrice)}</span>
                    </div>
                    <div className='cart-ctd'>
                      <div className='qty-change flex align-center'>
                        <button type='button' className='qty-decrease flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: cart?.id, type: "DEC"}))}>
                          <i className='fas fa-minus'></i>
                        </button>

                        <div className='qty-value flex align-center justify-center'>
                          {quantity}
                        </div>

                        <button type='button' className='qty-increase flex align-center justify-center' onClick={() => dispatch(toggleCartQty({id: id, type: "INC"}))}>
                          <i className='fas fa-plus'></i>
                        </button>
                      </div>
                    </div>

                    <div className='cart-ctd'>
                      <span className='cart-ctxt text-orange fw-5'>
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <div className='cart-ctd'>
                      <button className='cart-ctxt text-orange fw-5' onClick={() => dispatch (removeFromCart(id))}>
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
            <div className='cart-cfoot-l'>
              <button className='clear-cart-btn text-danger fs-15 text-uppercase fw-4'
                onClick={() => dispatch(clearCart())}
              >
                <span className='mx-1'>Clear Cart</span>
                <i className='fas fa-trash'></i>
              </button>
            </div>

            <div className='cart-cfoot-r flex flex-column justify-end'>
              <div className='total-txt flex align-center justify-end'>
                <div className='font-monrope fw-5'>
                  Total ({itemsCount}) items:
                </div>
                <span className='text-orange fs-22 mx-2 fw-6'>
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <button className='checkout-btn text-white bg-orange fs-16'>Check out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage



