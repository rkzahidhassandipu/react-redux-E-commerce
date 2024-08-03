// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state, action) => {
        state.categoriesStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = state.categories.concat(action.payload);
        state.categoriesStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncCategories.rejected, (state, action) => {
        state.categoriesStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncProductsOfCategory.pending, (state, action) => {
        state.categoryProducts = action.payload
        state.categoryProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductsOfCategory.rejected, (state, action) => {
        state.categoryProductsStatus = STATUS.FAILED;
      })
  },
});

export const fetchAsyncCategories = createAsyncThunk(
  "category/fetch",
  async () => {
    const { VITE_BASE_URL } = import.meta.env;
    const response = await fetch(`${VITE_BASE_URL}/products/categories`).then(
      (resp) => resp.json()
    );
    return response;
  }
);

export const fetchAsyncProductsOfCategory = createAsyncThunk("categories/fetch", async(category) => {
  const response = await fetch(`${BASE_URL}products/category/${category}`);
  const data = await response.json();
  return data.products;
})

export const getAllCategories = (state) => state.category.categories;
export const  getAllProDuctsByCategory = (state) => state.category.categoryProducts;
export const getCategoryProductsStatus = (state) => state.category.categoryProductsStatus;
export default categorySlice.reducer;
