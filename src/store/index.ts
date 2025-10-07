import { configureStore } from "@reduxjs/toolkit";
import popuation from "./dashboard";

export const store = configureStore({
  reducer: {
    population: popuation
  },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;