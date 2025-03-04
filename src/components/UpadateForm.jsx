import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleInputForm, updateTodo } from "../store/todoSlice";

function UpadateForm() {
  const dispatch = useDispatch();
  const selectorUpadte = useSelector((state) => state.todos.todoUpdateform);
  const [update, setUpdate] = useState({
    id: "",
    name: "",
    description: "",
  });

  function handleChange(e) {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
    if (!selectorUpadte) return;
    setUpdate({
      id: selectorUpadte.id || "",
      name: selectorUpadte.name || "",
      description: selectorUpadte.description || "",
    });
  }, [selectorUpadte]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!update.name.trim() || !update.description.trim()) return;

    dispatch(updateTodo(update));
    dispatch(toggleInputForm({}));
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg m-10">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <input
          type="text"
          name="name"
          value={update.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Add a Todo"
        />
        <textarea
          value={update.description}
          name="description"
          onChange={handleChange}
          className="w-full h-24 px-4 py-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Edit a Description"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-700 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default UpadateForm;
