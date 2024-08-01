import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    email: "",
    phone: "",
    preference: "",
    gender: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    SET_FORM_DATA(state, action) {
      state.formData = action.payload;
    },
    UPDATE_FORM_FIELD(state, action) {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    RESET_FORM(state) {
      state.formData = initialState.formData;
    },
  },
});

export const { SET_FORM_DATA, UPDATE_FORM_FIELD, RESET_FORM } = formSlice.actions;

export const selectFormData = (state) => state.form.formData;

export default formSlice.reducer;
