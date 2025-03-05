import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import AddTodo from "./AddTodo";
import UpdateForm from "./UpdateForm";

import {
  fetchTodos,
  deleteTodo,
  deleteMultipleTodos,
} from "../store/todoSlice";

function Displaycard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todos.todos);
  const selectedTodos = useSelector((state) => state.todos.selectedTodos);
  const isEditFormOpen = useSelector((state) => state.todos.toggleForm);
  const [showMessage, setShowMessage] = useState(false);
  const [countDeleted, setCountDeleted] = useState(0);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const clearAllTodo = () => {
    Promise.all(data.map((todo) => dispatch(deleteTodo(todo.id))));
  };

  async function deleteSelectedTodos() {
    if (selectedTodos.length > 0) {
      try {
        await dispatch(deleteMultipleTodos(selectedTodos));
        setCountDeleted(selectedTodos.length);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
          dispatch(fetchTodos());
        }, 1000);
      } catch (error) {
        console.error("Failed to delete todos:", error);
        alert("An error occurred while deleting todos. Please try again.");
      }
    }
  }

  return (
    <div className="bg-lightSlateGray  w-full min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-red-500 mt-4 mb-6">My TODOLIST</h1>

      <div className="w-full">
        {isEditFormOpen ? <AddTodo /> : <UpdateForm />}
      </div>
      {selectedTodos.length > 0 && (
        <button
          onClick={deleteSelectedTodos}
          className="bg-red-500 text-white px-4 py-2 rounded-md m-4"
        >
          Delete Selected
        </button>
      )}
      {showMessage && (
        <p className="text-green-500 font-semibold mt-2">
          {countDeleted} todo{countDeleted > 1 ? "s" : ""} deleted successfully
        </p>
      )}
      <button
        onClick={clearAllTodo}
        className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-8 px-6 rounded-md focus:outline-none transition duration-200"
      >
        Clear
      </button>
      <div className="w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.length > 0 ? (
            data.map((item) => <Card key={item.id} {...item} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No todos added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Displaycard;
