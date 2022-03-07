import { createSlice } from '@reduxjs/toolkit';

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    baseUrl: 'https://devcamp-2022-1-restaurant.azurewebsites.net/api',
    confirmDeleteUser: false,
    confirmDeleteCategory: false,
    confirmDeleteProduct: false,
    confirmDeleteOrder: false,
    categories: []
  },
  reducers: {
    confirmDeleteUser(state) {
      state.confirmDeleteUser = !state.confirmDeleteUser;
    },
    confirmDeleteCategory(state) {
      state.confirmDeleteCategory = !state.confirmDeleteCategory;
    },
    confirmDeleteProduct(state) {
      state.confirmDeleteProduct = !state.confirmDeleteProduct;
    },
    confirmDeleteOrder(state) {
      state.confirmDeleteOrder = !state.confirmDeleteOrder;
    },
    confirmDelete(state, action) {
      const type = action.payload;

      switch (type) {
        case 'user':
          state.confirmDeleteUser = !state.confirmDeleteUser;
          break;
        case 'category':
          state.confirmDeleteCategory = !state.confirmDeleteCategory;
          break;
        case 'order':
          state.confirmDeleteOrder = !state.confirmDeleteOrder;
          break;
        case 'product':
          state.confirmDeleteProduct = !state.confirmDeleteProduct;
          break;
      }
    },
    setCategories(state, action) {
      const categories = action.payload;

      state.categories = categories;
    }
  }
});

export const apiActions = apiSlice.actions;

export default apiSlice;
