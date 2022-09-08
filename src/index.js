import React from "react";
import ReactDOM from "react-dom";
import store from './redux/store'
import { Provider } from 'react-redux'
import App from "./components/app/App";

// import { ThemeProvider } from 'styled-components';
// import "./app.css";
import { AppStyled } from "./components/app/App.styled";
// import "./index.css";

import GlobalStyle from "./components/styles/GlobalCss.styled";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <GlobalStyle/>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
