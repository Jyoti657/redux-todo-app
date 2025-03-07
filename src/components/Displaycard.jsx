import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import AddTodo from "./AddTodo";
import UpdateForm from "./UpdateForm";
import {
  fetchTodos,
  deleteTodo,
  deleteMultipleTodos,
  clearSelectedTodos,
} from "../store/todoSlice";

function Displaycard() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todosData.todos);
  const selectedTodos = useSelector((state) => state.todosData.selectedTodos);
  const isCreateOrEditMode = useSelector((state) => state.todosData.toggleForm);
  const [showMessage, setShowMessage] = useState(false);
  const [countDeleted, setCountDeleted] = useState(0);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const clearAllTodo = () => {
    Promise.all(data.map((todo) => dispatch(deleteTodo(todo.id))));
  };

  const deleteSelectedTodos = async () => {
    if (selectedTodos.length === 0) return;

    try {
      await dispatch(deleteMultipleTodos(selectedTodos));
      setCountDeleted(selectedTodos.length);
      setShowMessage(true);
      dispatch(clearSelectedTodos());

      setTimeout(() => {
        setShowMessage(false);
        dispatch(fetchTodos());
      }, 1000);
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-10">
      <header className="w-full max-w-4xl text-center py-4">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          My Todo List
        </h1>
      </header>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        {isCreateOrEditMode ? <AddTodo /> : <UpdateForm />}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {selectedTodos.length > 0 && (
          <button
            onClick={deleteSelectedTodos}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            Delete Selected
          </button>
        )}
        <button
          onClick={clearAllTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
        >
          Clear All
        </button>
      </div>

      {showMessage && (
        <p className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg mt-4 shadow-md">
          {countDeleted} todo{countDeleted > 1 ? "s" : ""} deleted successfully!
        </p>
      )}

      <div className="w-full max-w-6xl mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {data.length > 0 ? (
            data.map((item) => <Card key={item.id} {...item} />)
          ) : (
            <p className="text-center text-gray-300 text-lg col-span-full">
              No todos added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Displaycard;
