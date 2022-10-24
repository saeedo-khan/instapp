import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface PageProviderProps {
  children: ReactNode;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const PageProvider = ({ children }: PageProviderProps) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    resolvedTheme === "light"
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default PageProvider;
