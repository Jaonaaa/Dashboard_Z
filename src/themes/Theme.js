import { dark, light } from "./ThemeData";

export const switchTheme = (ThemeName) => {
  const theme = getTheme(ThemeName);
  if (theme === undefined) return;
  document.documentElement.removeAttribute("class");
  document.documentElement.classList.add(theme);
  saveTheme(ThemeName);
};

const saveTheme = (themeName) => {
  localStorage.setItem("theme_user", themeName);
};

export const useDefaultTheme = () => {
  let themeName = localStorage.getItem("theme_user");
  if (themeName === null) switchTheme("light");
  else switchTheme(themeName);
};

const getTheme = (themeName) => {
  if (themeName === "dark") return dark;
  if (themeName === "light") return light;
};

export const getCurrentThemeName = () => {
  return localStorage.getItem("theme_user");
};

// const swapTheme = (proprety, value) => {
//   document.documentElement.style.setProperty(proprety, value);
// };

////
// swapTheme("--bg-color", theme["--bg-color"]);
// swapTheme("--bg-color-body", theme["--bg-color-body"]);
// swapTheme("--box-shadow-color", theme["--box-shadow-color"]);
// swapTheme("--text-color", theme["--text-color"]);
// swapTheme("--text-bold-color", theme["--text-bold-color"]);
// swapTheme("--input-bg", theme["--input-bg"]);
// swapTheme("--bg-color-hovered", theme["--bg-color-hovered"]);
// swapTheme("--primary", theme["--primary"]);
// swapTheme("--primary-hovered", theme["--primary-hovered"]);
//
