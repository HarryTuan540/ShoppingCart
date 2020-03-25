import React from "react";
import ShoppingCart from "./components/ShoppingCart";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9b59b6"
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ShoppingCart />
      </div>
    </ThemeProvider>
  );
}

export default App;
