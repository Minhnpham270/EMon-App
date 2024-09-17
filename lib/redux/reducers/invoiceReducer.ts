import { createSlice } from '@reduxjs/toolkit';
import { InvoiceModel } from '../../axios/model';

const initialState = {
  listInvoice: [] as InvoiceModel[],
  newInvoice: [] as InvoiceModel[],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    reset: () => initialState,
    setListInvoice(state, action) {
      state.listInvoice = action.payload;
    },
    addInvoice(state, action) {
      state.listInvoice = [action.payload, ...state.listInvoice];
      state.newInvoice = [action.payload, ...(state.newInvoice ?? [])];
      console.log('addInvoice-----', state.listInvoice);
    },
    setNewInvoice(state) {
      //   state.newInvoice = [1, ...state.newInvoice];
      //   console.log('setNewInvoice-----', state.newInvoice);
    },
    resetNewInvoice(state) {
      state.newInvoice = [];
      console.log('resetNewInvoice-----', state.newInvoice);
    },
  },
});

export const {
  reset,
  addInvoice,
  setListInvoice,
  setNewInvoice,
  resetNewInvoice,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
