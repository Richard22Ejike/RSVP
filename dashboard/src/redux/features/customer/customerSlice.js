import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";
import { toast } from "react-toastify";

const initialState = {
  customer: null,
  customers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  men: 0,
  women: 0,
  preference: 0,
};

// Create New Customer
export const createCustomer = createAsyncThunk(
  "customers/create",
  async (formData, thunkAPI) => {
    try {
      return await customerService.createCustomer(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all Customers
export const getCustomers = createAsyncThunk(
  "customers/getAll",
  async (_, thunkAPI) => {
    try {
      return await customerService.getCustomers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Customer
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id, thunkAPI) => {
    try {
      return await customerService.deleteCustomer(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a Customer
export const getCustomer = createAsyncThunk(
  "customers/getCustomer",
  async (id, thunkAPI) => {
    try {
      return await customerService.getCustomer(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Customer
export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await customerService.updateCustomer(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    CALC_WOMEN(state, action) {
      const customers = action.payload;
      let count = customers.filter((item) => item.gender === "female").length;
      state.women = count;
    },
    CALC_MEN(state, action) {
      const customers = action.payload;
      let count = customers.filter((item) => item.gender === "male").length;
      state.men = count;
    },
    CALC_NORMAL(state, action) {
      const customers = action.payload;
      let count = customers.filter((item) => item.preference === "normal").length;
      state.preference = count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.customers.push(action.payload);
        toast.success("Customer added successfully");
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload.id
        );
        toast.success("Customer deleted successfully");
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customer = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        );
        toast.success("Customer updated successfully");
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_NORMAL, CALC_MEN, CALC_WOMEN } = customerSlice.actions;

export const selectIsLoading = (state) => state.customer.isLoading;
export const selectCustomer = (state) => state.customer.customer;

// Add selectors for customer statistics
export const selectTotalWomen = (state) => state.customer.women;
export const selectTotalMen = (state) => state.customer.men;
export const selectTotalNormalPreference = (state) => state.customer.preference;

export default customerSlice.reducer;
