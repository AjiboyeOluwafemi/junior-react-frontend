import { createStore } from "redux";
import ProductsReducer from "./reducers/productsReducer.js";

export const store = createStore(ProductsReducer); 