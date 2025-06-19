import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/todos";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async ({ rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch todos");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error("Failed to add todo");
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw Error("Failed to delete todo");
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMultipleTodos = createAsyncThunk(
  "todo/deleteMultipleTodos",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await Promise(
        ids.map((id) =>
          fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids }),
          })
        )
      );
      if (!response.ok) throw new Error("Failed to multiple delete");
      return ids;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
    clearSelectedTodos: (state) => {
      state.selectedTodos = [];
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
        state.todos = state.todos.filter(
          (todo) => !action.payload.includes(todo.id)
        );
        state.selectedTodos = [];
      });
  },
});

export const { toggleInputForm, toggleSelectedTodo, clearSelectedTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
