
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import AddTodo from "./AddTodo";
import UpadateForm from "./UpadateForm";
import { fetchTodos, deleteTodo } from "../store/todoSlice";

function Displaycard() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const toggleForm = useSelector((state) => state.todos.toggleForm);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  function handleClear() {
    todos.forEach((todo) => dispatch(deleteTodo(todo.id)));
  }

  return (
    <div className="bg-gradient-to-r from-zinc-500 via-stone-600 to-zinc-900 w-full min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-red-500 mt-4 mb-6">My TODOList</h1>

      <div className="w-full">{toggleForm ? <AddTodo /> : <UpadateForm />}</div>

      <div className="w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {todos.length > 0 ? (
            todos.map((item) => <Card key={item.id} {...item} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No todos added yet.
            </p>
          )}
        </div>
        <button
          onClick={handleClear}
          className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-8 px-6 rounded-md focus:outline-none transition duration-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Displaycard;
