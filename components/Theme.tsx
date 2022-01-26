import { FunctionComponent, PropsWithChildren } from "react";

interface ThemeProps {
  dark: boolean;
}

const Theme: FunctionComponent<PropsWithChildren<ThemeProps>> = (props) => {
  return (
    <div className={props.dark ? "dark h-full" : "h-full"}>
      <div>{props.dark}</div>
      {props.children}
    </div>
  );
};

export default Theme;
