import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    const cart= localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

const storeInLocalStore = (data) => {
    localStorage.setItem('cart', JSON.stringify(data));
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
                        const updatedTotalPrice = updatedQuantity * item.discountedPrice;
                        console.log(updatedQuantity)

                        return {
                            ...item,
                            quantity: updatedQuantity,
                            totalPrice: updatedTotalPrice
                        };
                    } 
                    return item;
                });
            } else {
                state.carts.push(action.payload);
            }
            state.itemsCount = state.carts.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.carts.reduce((total, item) => total + item.totalPrice, 0);

            storeInLocalStore(state.carts);
        },
        removeFromCart: (state, action) => {
            state.carts = state.carts.filter(item => item.id !== action.payload);
            
            storeInLocalStore(state.carts);
        },
        clearCart: (state) => {
            state.carts = [];
            storeInLocalStore(state.carts)
        },
        getCartTotal: (state) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => 
            cartTotal + cartItem.totalPrice, 0);
            state.itemsCount = state.carts.length;
        },
        toggleCartQty: (state, action) => {
            state.carts = state.carts.map(item => {
                if(item.id === action.payload.id){
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;

                    if(action.payload.type === "INC"){
                        tempQty = Math.min(item.stock, tempQty + 1);
                    }else if(action.payload.type === "DEC"){
                        tempQty = Math.max(1, tempQty - 1)
                    }
                    tempTotalPrice = tempQty * item.discountedPrice;
                    
                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice};
                }
                return item;
            });
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