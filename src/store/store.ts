import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterReducer from "./slices/counterSlice"
import todoReducer from "./slices/todosSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()