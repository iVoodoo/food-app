import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";
import "styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import "regenerator-runtime";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

if (module.hot) {
  module.hot.accept();
}
