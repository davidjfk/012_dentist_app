import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from './redux/store'
import { Provider } from 'react-redux'

// import { ThemeProvider } from 'styled-components';
import "./App.css";
import { AppStyled } from "./App.styled";



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AppStyled> */}
        <App />
      {/* </AppStyled> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
