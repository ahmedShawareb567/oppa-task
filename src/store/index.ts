import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth";

const rootReducer = combineReducers({
  Auth: authReducer
});


const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof rootReducer>;
export type RootDispatch = typeof store.dispatch;


export {store};