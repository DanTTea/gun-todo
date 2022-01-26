import { FunctionComponent } from "react";
import { ToDoItem } from "./../interfaces/todos";
import { IoTrash } from "react-icons/io5";
import { deleteNode, editToDoItem } from "../services/gunDB";

interface ToDoItemProps {
  item: ToDoItem;
}

const TodoItem: FunctionComponent<ToDoItemProps> = (props) => {
  const checkboxChange = (event: { target: any }) => {
    const { target } = event;
    console.log(event);
    console.log(target.checked);

    return editToDoItem({ ...props.item, checked: target.checked });
  };

  const deleteTodo = () => {
    return deleteNode(props.item.id!);
  };

  return (
    <>
      <div
        className={`flex items-center whitespace-pre-line w-full dark:bg-slate-800 bg-white my-1 p-2 rounded-lg  ${
          props.item.checked ? "opacity-50" : ""
        }`}
      >
        <button onClick={deleteTodo} className="text-red-500">
          <IoTrash />
        </button>
        <div className="mx-6">{props.item.text}</div>
        <div className="form-check ml-auto">
          <input
            className="form-check-input h-4 w-4 transition duration-200 mt-1 float-left mr-2 cursor-pointer"
            type="checkbox"
            id="flexCheckDefault"
            defaultChecked={props.item.checked}
            onChange={checkboxChange}
          ></input>
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="flexCheckDefault"
          ></label>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
