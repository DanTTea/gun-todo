import { NextPage } from "next";
import { FunctionComponent, useEffect, useState } from "react";

interface LanguageProps {
  onThemeChange: Function;
}

const ThemeToggleButton: NextPage<LanguageProps> = (props) => {
  const [state, setState] = useState({ dark: true });

  useEffect(() => {
    const tmp =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (tmp !== state.dark) setState({ dark: tmp });
  });

  const toggle = (event: any) => {
    const { target } = event;
    const value = target.value === "true" ? true : false;

    props.onThemeChange(value);
    setState({ dark: value });
    return;
  };

  return (
    <div className="dark:bg-gray-900">
      <select
        defaultValue={state.dark.toString()}
        onChange={toggle}
        className="w-10  dark:bg-gray-900 bg-gray-100 "
      >
        <option value="false">&#127773;</option>
        <option value="true">&#127770;</option>
      </select>
    </div>
  );
};

export default ThemeToggleButton;
