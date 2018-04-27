import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import root from "reducers";

const store = createStore(
  root,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
