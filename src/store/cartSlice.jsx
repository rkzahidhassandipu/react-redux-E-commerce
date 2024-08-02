import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    const cart= localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

const storeInLocalStore = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}

const initialState = {
    carts: fetchFromLocalStorage(),
    itemsCount: 0,
    totalAmount: 0,
    isCartMessageOn: false
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isItemInCart = state.carts.find(item => item.id === action.payload.id);

            if (isItemInCart) {
                state.carts = state.carts.map(item => {
                    if (item.id === action.payload.id) {
                        const updatedQuantity = item.quantity + action.payload.quantity;
                        const updatedTotalPrice = updatedQuantity * item.price;

                        return {
                            ...item,
                            quantity: updatedQuantity,
                            totalPrice: updatedTotalPrice
                        }
                    } else {
                        return item;
                    }
                });
            } else {
                state.carts.push(action.payload);
            }
            state.itemsCount = state.carts.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.carts.reduce((total, item) => total + item.totalPrice, 0);

            storeInLocalStore(state.carts)
        },
        removeFromCart: (state, action) => {
            const tempCart = state.carts.filter(item => item.id !== action.payload);
            state.carts = tempCart;
            storeInLocalStore(state.carts);
        },
        clearCart: (state) => {
            state.carts = [];
            storeInLocalStore(state.carts)
        },
        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice
            }, 0);
            state.itemsCount = state.carts.length;
        },
        toggleCartQty: (state, action) => {
            const tempCart = state.carts.map(item => {
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if(action.payload.type === "INC"){
                        tempQty++;
                        if(tempQty === item.stock) {
                            tempQty = item.stock;
                            tempTotalPrice = tempQty * item.discountedPrice;
                        }
                        if(action.payload.type === "DEC"){
                            tempQty--;
                            if(tempQty < 1){
                                tempQty = 1;
                                tempTotalPrice = tempQty * item.discountedPrice;;
                            }
                            return {...item, quantity: tempQty, totalPrice: tempTotalPrice}
                        }
                    }
                }
            });
            state.carts = tempCart;
            storeInLocalStore(state.carts)
        },
        setCartMessageOn: (state)=>{
            state.isCartMessageOn = true
        },
        setCartMessageOff: (state)=>{
            state.isCartMessageOn = false
        }
        
    }
})

export const {addToCart, setCartMessageOff, setCartMessageOn, getCartTotal, toggleCartQty, clearCart, removeFromCart} = CartSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;
export default CartSlice.reducer