import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import departmentReducer from "./department";
import productReducer from "./product";
import rawMaterialReducer from "./rawMaterial";
import capitalReducer from "./capital";
import expenseReducer from "./expense";

export default configureStore({
    reducer: {
        ui: uiReducer,
        department: departmentReducer,
        expense: expenseReducer,
        capital: capitalReducer,
        rawMaterial: rawMaterialReducer,
        product: productReducer,
    }
});