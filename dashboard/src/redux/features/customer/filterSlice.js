import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCustomers: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    FILTER_CUSTOMERS(state, action) {
      const { customers, search } = action.payload;
      const tempCustomers = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.phone.toLowerCase().includes(search.toLowerCase()) ||
          customer.gender.toLowerCase().includes(search.toLowerCase()) ||
          customer.preference.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredCustomers = tempCustomers;
    },
  },
});

export const { FILTER_CUSTOMERS } = customerSlice.actions;

export const selectFilteredCustomers = (state) => state.customer.filteredCustomers;

export default customerSlice.reducer;
