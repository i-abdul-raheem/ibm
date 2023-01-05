import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
  name: "department",
  initialState: {
    id: "",
    form: {
      title: "",
    },
    departments: [],
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});

export const { setId, setForm, setDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
