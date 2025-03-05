import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";

function AddTodo() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newTodo = {
      name: data.name.trim(),
      description: data.description.trim(),
    };

    dispatch(addTodo(newTodo));
    reset();
  };

  return (
    <div className=" w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <input
          {...register("name", {
            required: "name required",
            minLength: {
              value: 5,
              message: "The name must be in the 5 character atleast",
            },
            maxLength: { value: 10, message: "It should less than 10" },
          })}
          placeholder="Add a Todo"
          className=" w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "The  description must be in 10 character atleast",
            },
            maxLength: {
              value: 30,
              message: "The maxlength of description is 30",
            },
          })}
          placeholder="ADD a Description"
          className=" w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
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
