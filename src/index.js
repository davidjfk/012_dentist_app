import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from './redux/store'
import { Provider } from 'react-redux'

import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    bluegrey: "#a6b8b9",
    nearlyblack: "#3a3a55",
    onHoverBackground: "#FFFFCC",
    onHoverBackgroundColorDelete: "red",
    onHoverBackgroundColorUpdate: "orange"
  },
  font: "Helvetica",
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
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
