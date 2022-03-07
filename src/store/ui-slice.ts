import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    errorType: '',
    successType: '',
    deleteType: '',
    showErrorModal: false,
    showSuccessModal: false,
    showConfirmDeleteModal: false
  },
  reducers: {
    toggleErrorModal(state, action) {
      const type = action.payload;

      if (type !== '') {
        state.errorType = action.payload;
      }

      state.showErrorModal = !state.showErrorModal;
    },
    toggleSuccessModal(state, action) {
      const type = action.payload;

      if (type !== '') {
        state.successType = action.payload;
      }

      state.showSuccessModal = !state.showSuccessModal;
    },
    toggleConfirmDeleteModal(state, action) {
      const type = action.payload;

      if (type !== '') {
        state.deleteType = action.payload;
      }

      state.showConfirmDeleteModal = !state.showConfirmDeleteModal;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
