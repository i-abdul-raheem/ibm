import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    id: "",
    form: {
      title: "",
    },
    products: [],
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setId, setForm, setProducts } = productSlice.actions;
export default productSlice.reducer;
