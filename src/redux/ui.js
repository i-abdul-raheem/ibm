import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    toaster: false,
    toastMsg: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToast: (state, action) => {
      state.toaster = action.payload;
    },
    setToastMsg: (state, action) => {
      state.toastMsg = action.payload;
    },
  },
});

export const {
  setLoading,
  setToast,
  setToastMsg
} = uiSlice.actions;
export default uiSlice.reducer;
