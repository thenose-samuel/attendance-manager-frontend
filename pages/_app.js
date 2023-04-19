import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "@/styles/globals.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/400.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
