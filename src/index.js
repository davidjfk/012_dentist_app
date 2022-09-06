import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from './redux/store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components';
import "./App.css";
import { AppStyled } from "./App.styled";

const theme = {
  colors: {
    button01: "aquamarine", 
    background01: "lightslategray", 
    background02: "lightyellow", 
    background03: "aquamarine", 
    background04: "orange", 
    background05: "purple", 
    background06: "red", 
    fontColor01: "black",
    fontColor02: "white", 
    fontColor03: "darkSalmon",

    header01: "deepskyblue",

    onHoverBackground01: "lightslategray",
    onHoverBackground02: "aquamarine",

    onHoverFontColor01: "greenyellow"
  },
  font: {
    font01: "Helvetica"
  },
  fontSize: {
      tiny: "0.5rem",
      small: "1rem",
      medium: "1.2rem",
      default: "1.4rem",
      big: "1.9rem"
  }
};


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme = {theme}>
        <AppStyled>
          <App />
        </AppStyled>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
