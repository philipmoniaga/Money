// Polyfill before requiring other files
import "./polyfill";

/* eslint-disable import/first */
import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
/* eslint-enable import/first */

import Root from "../components/Root";
import configureStore from "../redux";
import createRootSaga from "../sagas";

// import { push } from "../actions/RouteActions";

const store = configureStore(window.__data);
const history = createBrowserHistory();
store.runSaga(createRootSaga(history));

ReactDOM.render(
  <Root store={ store } />,
  document.getElementById("root"),
);

// store.dispatch(push("/p/123/"));