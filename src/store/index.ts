import { configureStore } from "@reduxjs/toolkit";
import company from "./reducers/company.slice";

const store = configureStore({
  reducer: { company },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
