import { FunctionComponent, useEffect, useState } from "react";
import { editToDoItem } from "../services/gunDB";
import { IoSend } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import autosize from "autosize";
import * as uid from "uuid";

const InputTextarea: FunctionComponent = (props) => {
  let textarea: any;
  const { t } = useTranslation();

  const [state, setState] = useState({ text: "" });

  const textChange = (event: { target: { value: any } }) => {
    setState({ text: event.target.value });
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && e.shiftKey) {
      // console.log("SHIFT ENTER");
    } else if (e.key === "Enter") {
      e.preventDefault();
      addItem(e);
    }
  };

  const addItem = (event: any) => {
    event.preventDefault();
    const { target } = event;

    const textArea = target.nodeName === "TEXTAREA" ? target : target[0];
    const id = uid.v4();

    // Do nothing if only whitespace
    if (textArea.value.trim() === "") {
      return;
    }

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
      <section className="p-8">
        <form onSubmit={addItem} className="flex justify-center items-center">
          <textarea
            ref={(c) => (textarea = c)}
            placeholder={
              t("common:enterYourTodo-placeholder") ===
              "common:enterYourTodo-placeholder"
                ? ""
                : t("common:enterYourTodo-placeholder")
            }
            onChange={textChange}
            onKeyPress={handleKeyPress}
            className="dark:bg-gray-600 w-96 md:text-4xl text-2xl dark:text-lime-300 text-lime-600 rounded-xl h-2 p-2"
          />

          <button
            type="submit"
            className="flex-shrink-0 bg-transparent mx-2 w-12 h-12  font-bold rounded-xl  text-white dark:text-slate-900 text-center cursor-pointer p-2"
          >
            <IoSend className="w-full h-full dark:text-lime-300 dark:hover:text-lime-600  text-lime-600 hover:text-lime-700 " />
          </button>
        </form>
      </section>
    </>
  );
};

export default InputTextarea;
