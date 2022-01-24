import { NextPage } from "next";
import { useState } from "react";

const inputStyle = {
  width: "300px",
  margin: "50px",
};

const InputTodo: NextPage<{ text: string }> = (props) => {
  const { text } = props;
  console.log("input props", props);

  let [state, setState] = useState({ text: text });

  return (
    <>
      <input
        style={inputStyle}
        placeholder="Enter your ToDo..."
        value={state.text}
      ></input>
    </>
  );
};

export default InputTodo;
