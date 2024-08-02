import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCustomers: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_CUSTOMERS(state, action) {
      const { customers, search } = action.payload;
      console.log('Customers:', customers);
      console.log('Search:', search);
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

export const { FILTER_CUSTOMERS } = filterSlice.actions;

export const selectFilteredCustomers = (state) => state.filter.filteredCustomers;

export default filterSlice.reducer;
