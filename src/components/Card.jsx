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
  
    
    <div
    className="w-full bg-gradient-to-br from-sky-100 to-blue-200 p-6 rounded-2xl shadow-xl 
               transition-transform duration-300 ease-in-out transform hover:scale-105 
               hover:shadow-2xl min-h-[180px] flex flex-col justify-between animate-fade-in"
  >
    <div className="overflow-hidden flex-grow">
      <h1 className={`text-xl font-semibold text-gray-800 ${done ? "line-through text-gray-400" : ""}`}>
        {name}
      </h1>
      <h2 className={`mt-2 text-md font-medium text-gray-700 ${done ? "line-through text-gray-400" : ""}`}>
        {description}
      </h2>
    </div>

    <div className="flex justify-center sm:justify-end space-x-5 mt-6">
      <BsCheckSquare
        title="Mark as Done"
        className="cursor-pointer text-green-700 text-2xl hover:text-green-500 hover:scale-110 transition duration-200 ease-in-out"
        onClick={() => setDone(!done)}
      />
      <FaEdit
        title="Edit Todo"
        className={`text-yellow-700 text-2xl hover:text-yellow-500 hover:scale-110 transition duration-200 ease-in-out 
          ${done ? "opacity-50 cursor-not-allowed hover:scale-100" : "cursor-pointer"}`}
        onClick={updateTodoHandler}
      />
      <BsTrashFill
        title="Delete Todo"
        className="cursor-pointer text-red-700 text-2xl hover:text-red-500 hover:scale-110 transition duration-200 ease-in-out"
        onClick={deleteTodoHandler}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selectedTodos.includes(id)}
          onChange={selectTodoHandler}
          className="h-5 w-5 accent-blue-700 cursor-pointer"
        />
      </div>
    </div>
  </div>
  );
}

export default Card;
