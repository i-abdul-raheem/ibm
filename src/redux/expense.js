import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    id: "",
    form: {
      title: "",
      amount: "",
    },
    expenses: [],
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { setId, setForm, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
