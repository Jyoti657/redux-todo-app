import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function TodoForm({ initialValues, onSubmit, buttonText }) {
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const submitHandler = (data) => {
    const cleanedData = {
      name: data.name.trim(),
      description: data.description.trim(),
    };

    if (!cleanedData.name || !cleanedData.description) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onSubmit(data);
    reset();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col space-y-5"
      >
        {showError && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md">
            <h2 className="text-xl font-bold">Invalid Input</h2>
            <p className="text-sm">
              Oops ... looks like you forgot to enter a value.
            </p>
            <p className="text-sm">
              Please make sure you provide a valid value for every input field.
            </p>
          </div>
        )}
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 5, message: "Must be at least 5 characters" },
            maxLength: {
              value: 10,
              message: "Must be less than 10 characters",
            },
            onChange: () => setShowError(false),
          })}
          placeholder="Todo Name"
          className="w-full px-4 py-2  text-black border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}

        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "Must be at least 10 characters" },
            maxLength: {
              value: 30,
              message: "Must be less than 30 characters",
            },
            onChange: () => setShowError(false),
          })}
          placeholder="Todo Description"
          className="w-full px-4 py-2 text-black border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
