import { FunctionComponent } from "react";
import Language from "./Language";
import ThemeToggleButton from "./theme-toggle-button";

interface HeaderProps {
  themeChange: Function;
}

const Header: FunctionComponent<HeaderProps> = (prop) => {
  return (
    <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-900 pb-7">
      <div>
        <Language />
      </div>
      <div>
        <ThemeToggleButton onThemeChange={prop.themeChange} />
      </div>
    </div>
  );
};

export default Header;
