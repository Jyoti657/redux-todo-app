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
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl transition-transform duration-300 animate-fade-in">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col space-y-5"
      >
        {showError && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">Invalid Input</h2>
            <ul className="text-sm list-disc list-inside mt-1 space-y-1">
              <li>Todo name and description cannot be empty.</li>
              <li>Please ensure all fields meet the required criteria.</li>
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-1">
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
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Must be at least 10 characters",
              },
              maxLength: {
                value: 30,
                message: "Must be less than 30 characters",
              },
              onChange: () => setShowError(false),
            })}
            placeholder="Todo Description"
            className="w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded-md shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
