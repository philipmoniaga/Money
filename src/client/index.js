// Polyfill before requiring other files
import "./polyfill";

/* eslint-disable import/first */
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import createBrowserHistory from "history/createBrowserHistory";
/* eslint-enable import/first */

import Root from "../components/Root";
import { rehydrate } from "../reducers";
import configureStore from "../redux";
import createRootSaga from "../sagas";
import { changeComponent } from "../actions/RouteActions";
import { getRouteComponent } from "../routes";
import { NODE_ENV } from "../Config";

function render(store) {
  ReactDOM.render(
    <AppContainer>
      <Root store={ store } />
    </AppContainer>,
    document.getElementById("root"),
  );
}

// Initialize Redux
const store = configureStore(rehydrate(window.__data));
const history = createBrowserHistory();
store.runSaga(createRootSaga(history));

// Fetch the necessary chunk for the route
const RouteComponent = getRouteComponent(store.getState().Route.get("name"));
RouteComponent.preload()
  .then(() => {
    store.dispatch(changeComponent(RouteComponent));
    render(store);
  });

// Enable Webpack hot module replacement for React component
if (NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./index", () => render(store));
  }
}
