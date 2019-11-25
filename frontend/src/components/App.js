import React from "react";
import { Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import GoogleTagManager from "../containers/GoogleTagManager";

// https://github.com/diegohaz/arc/wiki/Styling
import theme from "./themes/default";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <GoogleTagManager />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
