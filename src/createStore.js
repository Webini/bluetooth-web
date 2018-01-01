import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from './reducers.js';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

const initialState = {};

const middlewares = [
  // Build the router middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  thunkMiddleware
];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
      // Prevent recomputing reducers for `replaceReducer`
      shouldHotReload: false,
    })
    : compose;
/* eslint-enable */

export default function(state = initialState) {
  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }), 
    state,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};