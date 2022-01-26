import { FunctionComponent } from "react";

interface ToastProps {
  text: string;
}

const Toast: FunctionComponent<ToastProps> = (props) => {
  return (
    <>
      <div className="fixed top-2 right-2 bg-green-600 rounded text-white">
        <div className=" bg-green-600 rounded p-2">{props.text}</div>
      </div>
    </>
  );
};

export default Toast;
