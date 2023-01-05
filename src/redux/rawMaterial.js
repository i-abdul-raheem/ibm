import { createSlice } from "@reduxjs/toolkit";

export const rawMaterialSlice = createSlice({
  name: "rawMaterial",
  initialState: {
    id: "",
    form: {
      title: "",
    },
    rawMaterials: [],
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setRawMaterials: (state, action) => {
      state.rawMaterials = action.payload;
    },
  },
});

export const { setId, setForm, setRawMaterials } = rawMaterialSlice.actions;
export default rawMaterialSlice.reducer;
