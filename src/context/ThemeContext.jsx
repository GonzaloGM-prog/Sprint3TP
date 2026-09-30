import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

const TEMA_OSCURO = "dark";
const TEMA_CLARO = "light";

export function ThemeProvider({ children }) {
  const [tema, setTema] = useLocalStorage("videojuegos:tema", TEMA_OSCURO);
  const esOscuro = tema === TEMA_OSCURO;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", esOscuro);
  }, [esOscuro]);

  const alternarTema = () => {
    setTema((anterior) => (anterior === TEMA_OSCURO ? TEMA_CLARO : TEMA_OSCURO));
  };

  return (
    <ThemeContext.Provider value={{ esOscuro, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const contexto = useContext(ThemeContext);

  if (contexto === null) {
    throw new Error("useThemeContext solo se puede usar dentro de un <ThemeProvider>");
  }

  return contexto;
}
