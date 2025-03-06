import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, toggleInputForm } from "../store/todoSlice";
import TodoForm from "./TodoForm";

function UpdateForm() {
  const dispatch = useDispatch();
  const selectedTodo = useSelector((state) => state.todosData.todoUpdateForm);

  const handleUpdateTodo = (data) => {
    dispatch(updateTodo(data));
    dispatch(toggleInputForm({}));
  };

  return selectedTodo ? (
    <TodoForm
      initialValues={selectedTodo}
      onSubmit={handleUpdateTodo}
      buttonText="Update"
    />
  ) : null;
}

export default UpdateForm;
