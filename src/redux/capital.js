import { createSlice } from "@reduxjs/toolkit";

export const capitalSlice = createSlice({
  name: "capital",
  initialState: {
    id: "",
    form: {
      account: "",
      amount: "",
    },
    capitals: [],
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setCapitals: (state, action) => {
      state.capitals = action.payload;
    },
  },
});

export const { setId, setForm, setCapitals } = capitalSlice.actions;
export default capitalSlice.reducer;
