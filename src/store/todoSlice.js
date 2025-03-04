import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/todos";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch(API_URL);
  return response.json();
});

// Add todo
export const addTodo = createAsyncThunk("todo/addTodo", async (todo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
});

// Delete todo
export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return id;
});

// update todo
export const updateTodo = createAsyncThunk("todo/updateTodo", async (todo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return response.json();
});
//deleteMultiple
export const deleteMultipleTodos = createAsyncThunk(
  "todo/deleteMultipleTodos",
  async (ids) => {
    await Promise.all(
      ids.map((id) => fetch(`${API_URL}/${id}`, { method: "DELETE" }))
    );
    return ids;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    selectedTodos: [],
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
    toggleSelectedTodo: (state, action) => {
      const id = action.payload;
      if (state.selectedTodos.includes(id)) {
        state.selectedTodos = state.selectedTodos.filter(
          (todoId) => todoId !== id
        );
      } else {
        state.selectedTodos.push(id);
      }
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
      })
      .addCase(deleteMultipleTodos.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          todo.id === action.payload.id ? action.payload : todo;
        });
      });
  },
});

export const { toggleInputForm, toggleSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;
