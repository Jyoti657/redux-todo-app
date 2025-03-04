import React from "react";
import { BsTrashFill, BsCheckSquare } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleInputForm,
  toggleSelectedTodo,
} from "../store/todoSlice";
import { useState } from "react";

function Card({ id, name, description }) {
  const dispatch = useDispatch();
  const selectedTodos = useSelector((state) => state.todos.selectedTodos);
  const [done, setDone] = useState(false);

  function handleDeleted() {
    dispatch(deleteTodo(id));
  }
  function handleUpdate() {
    dispatch(
      toggleInputForm({
        id,
        name,
        description,
      })
    );
  }
  function handleSelected() {
    dispatch(toggleSelectedTodo(id));
  }
  return (
    <div className="w-full bg-red-100 p-6 rounded-xl shadow-lg min-h-[180px] flex flex-col justify-between">
      <div>
        <h1 className={done ? "font-semibold line-through" : "font-semibold"}>
          {name}
        </h1>
        <h2 className={done ? "font-semibold line-through" : "font-semibold"}>
          {description}
        </h2>
      </div>
      <div className="flex justify-center sm:justify-end space-x-5 mt-4">
        <BsCheckSquare
          className="cursor-pointer text-green-700 text-2xl hover:text-green-500 transition duration-200"
          onClick={() => setDone(!done)}
        />
        <FaEdit
          className="cursor-pointer text-yellow-700 text-2xl hover:text-yellow-500 transition duration-200"
          onClick={handleUpdate}
        />
        <BsTrashFill
          className="cursor-pointer text-red-800 text-2xl hover:text-red-600 transition duration-200"
          onClick={handleDeleted}
        />
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedTodos.includes(id)}
            onChange={handleSelected}
            className="h-5 w-5 accent-black"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
