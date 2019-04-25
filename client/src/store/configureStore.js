import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const configureStore = (preloadedState = {}) => {
  const middlewares = [thunk];
  const enhancers = [applyMiddleware(...middlewares)];

  if (process.env.NODE_ENV !== 'production') {
    enhancers.push(
      (window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()) ||
        (x => x)
    );
  }

  const store = createStore(rootReducer, preloadedState, compose(...enhancers));

  return store;
};

export default configureStore;
