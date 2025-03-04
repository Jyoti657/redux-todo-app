import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";

function AddTodo() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || !description.trim()) {
      setError("Please enter a todo before submitting");
      return;
    }
    const newTodo = {
      name: input.trim(),
      description: description.trim(),
    };
    dispatch(addTodo(newTodo));
    setInput("");
    setDescription("");
    setError("");
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
            {error}
          </div>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Add a Todo"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-24 px-4 py-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Add a Description"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
