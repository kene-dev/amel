import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartPayload, CartState } from '../../utils/types';

const initialState: CartState = {
    cartItems: [],
    totalQuantity: 0,
    subtotal: 0,
    totalAmount: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartPayload>) => {
            const {...product } = action.payload;
            const existingItem = state.cartItems.find((item) => item._id === product._id);

            if (existingItem) {
                existingItem.quantity += product.quantity;
            } else {
                state.cartItems.push({
                    ...product,
                    quantity: product.quantity
                });
            }

            state.totalQuantity += product.quantity;
            state.subtotal += product.price * product.quantity;
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find((item) => item._id === action.payload);

            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.subtotal += item.price;
            }
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find((item) => item._id === action.payload);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.subtotal -= item.price;
                } else {
                    state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
                    state.totalQuantity -= 1;
                    state.subtotal -= item.price;
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const existingItem = state.cartItems.find((item) => item._id === action.payload);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;

                state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
            }
        },
        clearCart:(state) => {
           state.cartItems =  [],
           state.totalQuantity = 0,
           state.subtotal = 0,
           state.totalAmount = 0
        }
    }
});
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
