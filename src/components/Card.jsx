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
  const selectedTodos = useSelector((state) => state.todosData.selectedTodos);
  const [done, setDone] = useState(false);

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(id));
  };

  const updateTodoHandler = () => {
    if (done) return;
    dispatch(
      toggleInputForm({
        id,
        name,
        description,
      })
    );
  };
  const selectTodoHandler = () => {
    dispatch(toggleSelectedTodo(id));
  };

  return (
    <div className="w-full bg-customBlue p-6 rounded-xl shadow-lg min-h-[180px]  flex flex-col justify-between">
      <div className="overflow-hidden flex-grow">
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
          className={`cursor-pointer text-yellow-700 text-2xl hover:text-yellow-500 transition duration-200 ${
            done ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={updateTodoHandler}
        />
        <BsTrashFill
          className="cursor-pointer text-red-800 text-2xl hover:text-red-600 transition duration-200"
          onClick={deleteTodoHandler}
        />
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedTodos.includes(id)}
            onChange={selectTodoHandler}
            className="h-5 w-5 accent-black"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
