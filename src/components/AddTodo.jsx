import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import TodoForm from "./TodoForm";

function AddTodo() {
  const dispatch = useDispatch();

  const handleAddTodo = (data) => {
    dispatch(
      addTodo({ name: data.name.trim(), description: data.description.trim() })
    );
  };

  return <TodoForm onSubmit={handleAddTodo} buttonText="Add Todo" />;
}
                                                                                                                                                                                                                                                                                                                                              
export default AddTodo;
