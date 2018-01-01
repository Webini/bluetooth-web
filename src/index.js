import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import createStore, { history } from './createStore.js';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import routes from './routes.js';

// import registerServiceWorker from './registerServiceWorker';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>  
  </Provider>, 
  document.getElementById('root')
);

/**
 * Si un jour on passe sur du server side rendering
 * https://github.com/nfl/react-helmet#server-usage
 */