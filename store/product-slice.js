import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("products/fetchData", async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    wishList: [],
  },
  reducers: {
    getProductById(state, action) {
      const id = action.payload;
      const prod = state.products.find((item) => item.id === id);
      state.product = {
        ...prod,
      };
    },

    removeWishListItem(state, action){
      const id = action.payload;
      state.wishList = state.wishList.filter((item) => item.id !== id);
    },

    addToWishList(state, action){
      const wishlistItem = action.payload;
      const checkItem = state.wishList.find((item) => item.id === wishlistItem.id);

      if(!checkItem){
        state.wishList.push(wishlistItem);
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const productActions = productSlice.actions;
export default productSlice;
