import { NextPage } from "next";
import { useEffect, useState } from "react";
import autosize from "autosize";
import { ToDoItem } from "../interfaces/todos";
import { activeToDo, editToDoItem } from "../services/gunDB";

interface InputTextareaProps {}

const InputTextarea: NextPage = (props: InputTextareaProps) => {
  let textarea: any;

  const [state, setState] = useState({ text: "" });

  const textChange = (event: { target: { value: any } }) => {
    setState({ text: event.target.value });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && e.shiftKey) {
      console.log("SHIFT ENTER");
    } else if (e.key === "Enter") {
      e.preventDefault();
      addItem(e);
    }
  };

  const addItem = (event: any) => {
    event.preventDefault();
    const { target } = event;

    const textArea = target.nodeName === "TEXTAREA" ? target : target[0];
    const id = activeToDo.items.length;

    editToDoItem({
      id: id.toString(),
      text: textArea.value,
      checked: false,
      order: -1,
    });

    textArea.value = "";
    setState({ text: "" });

    autosize.update(textarea);
  };

  useEffect(() => {
    autosize(textarea);
  }, [textarea]);

  return (
    <>
      <form onSubmit={addItem} className="flex">
        <textarea
          ref={(c) => (textarea = c)}
          placeholder="type some text"
          rows={1}
          onChange={textChange}
          onKeyPress={handleKeyPress}
          className="dark:bg-gray-600 w-80 text-4xl dark:text-lime-300 text-lime-600 rounded-xl p-0.5"
        />
        <button
          type="submit"
          className="dark:hover:bg-lime-600 hover:bg-lime-700 font-bold rounded dark:bg-lime-300 bg-lime-600 text-white dark:text-slate-900 text-center cursor-pointer p-2"
        >
          <img src="/icons/send-svgrepo-com.svg" />
        </button>
      </form>
    </>
  );
};

export default InputTextarea;
