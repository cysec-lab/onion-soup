import { createContext, useState } from "react";

const DarkModeContext = createContext({
  darkMode: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDarkMode: () => {},
});

function DarkModeProvider(props: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </DarkModeContext.Provider>
    </div>
  );
}
export { DarkModeContext, DarkModeProvider };
