import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toggleInputForm, updateTodo } from "../store/todoSlice";

function UpdateForm() {
  const dispatch = useDispatch();
  const selectedTodo = useSelector((state) => state.todos.todoUpdateForm);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedTodo) {
      setValue("id", selectedTodo.id || "");
      setValue("name", selectedTodo.name || "");
      setValue("description", selectedTodo.description || "");
    }
  }, [selectedTodo, setValue]);

  const onSubmit = (data) => {
    dispatch(updateTodo(data));
    dispatch(toggleInputForm({}));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <div>
          <input
            {...register("name", {
              required: "Todo name is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
            })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Update Todo Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 5, message: "Must be at least 5 characters" },
            })}
            className="w-full h-24 px-4 py-2 border rounded-md resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Update Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
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

export default UpdateForm;
