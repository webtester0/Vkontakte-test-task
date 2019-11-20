import React from "react";
import ReactDOM from "react-dom";
import { App } from "components/App";
import { Provider } from "react-redux";
import "./style.css";
import store from "./store/store";

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component></Component>
    </Provider>,
    document.getElementById("root")
  );

render(App);

if (module.hot) {
  module.hot.accept("components/App", () => {
    const NextApp = require("components/App").default;
    render(NextApp);
  });
}
