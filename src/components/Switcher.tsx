import { useState } from "react";

import { Darkmode } from "../utils/DarkMode";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export const Switcher = () => {
  const { colorTheme, setTheme } = Darkmode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        // style={{ marginBottom: "2rem" }}
        checked={darkSide}
        onChange={toggleDarkMode}
        size={30}
      />
    </>
  );
};
