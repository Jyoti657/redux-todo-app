import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// JSON Server URL
const API_URL = "http://localhost:5000/todos";

// Fetch todos from JSON Server
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch(API_URL);
  return response.json();
});

// Add todo to JSON Server
export const addTodo = createAsyncThunk("todo/addTodo", async (todo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
});

// Delete todo from JSON Server
export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return id;
});

// Update todo in JSON Server
export const updateTodo = createAsyncThunk("todo/updateTodo", async (todo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    toggleForm: true,
    todoUpdateForm: {},
    status: "idle",
    error: null,
  },
  reducers: {
    toggleInputForm: (state, action) => {
      state.toggleForm = !state.toggleForm;
      state.todoUpdateForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      });
  },
});

export const { toggleInputForm } = todoSlice.actions;
export default todoSlice.reducer;
