import React from "react";
import { BsTrashFill, BsCheckSquare } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleInputForm } from "../store/todoSlice";
import { useState } from "react";

function Card({ id, name, description }) {
  const dispatch = useDispatch();
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
      </div>
    </div>
  );
}

export default Card;
