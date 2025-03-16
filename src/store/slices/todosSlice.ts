import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { standardFetch } from "../../utils/centralApi";

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: false
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, thunkApi) => {
    const result = await standardFetch('/todos')
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    if (result?.failed) {
      return thunkApi.rejectWithValue(result.failedMessage)
    } else {
      return result?.json
    }
  }
)

const initialState = {
  items: [],
  loading: false,
  error: false,
  errorMsg: ""
}

const todosSlice = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    resetTodos: (state) => {
      state.items = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false
      state.error = false
      state.errorMsg = ""
      state.items = action.payload
    })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.errorMsg = JSON.stringify(action.payload) || "Error"
      })
      .addCase(fetchTodos.pending, (state) => {
        state.error = false
        state.loading = true
      })
  }
})

export const { resetTodos } = todosSlice.actions
export default todosSlice.reducer