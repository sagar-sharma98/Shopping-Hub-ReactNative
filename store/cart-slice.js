import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalItem: 0,
    totalPrice: 0,
  },

  reducers: {
    addToCart(state, action) {
      const cartItem = action.payload;
      const findItem = state.cart.find((item) => item.id === cartItem.id);
      if (!findItem) {
        state.cart.push({
          ...cartItem,
          quantity: 1,
          itemTotalPrice: cartItem.price,
        });
      } else {
        findItem.quantity += 1;
        findItem.itemTotalPrice = findItem.quantity * cartItem.price;
      }
      state.totalItem = state.totalItem + 1;
      state.totalPrice = state.totalPrice + cartItem.price;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.cart.find((item) => item.id === id);
      state.cart = state.cart.filter((item) => item.id !== id);
      state.totalPrice = state.totalPrice - findItem.itemTotalPrice;
      state.totalItem = state.totalItem - findItem.quantity;
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.cart.find((item) => item.id === id);
      if (findItem.quantity === 5) return;
      findItem.quantity += 1;
      findItem.itemTotalPrice = findItem.itemTotalPrice + findItem.price;
      state.totalItem += 1;
      state.totalPrice += findItem.price;
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.cart.find((item) => item.id === id);
      if (findItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
        state.totalItem = state.totalItem - findItem.quantity;
        state.totalPrice = state.totalPrice - findItem.itemTotalPrice;
      } else {
        findItem.quantity -= 1;
        findItem.itemTotalPrice = findItem.itemTotalPrice - findItem.price;
        state.totalItem -= 1;
        state.totalPrice -= findItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
