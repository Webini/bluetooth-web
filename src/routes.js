import makeGenerator from './services/routesGenerator.js';
import App from './containers/App/App.jsx';
import Index from './containers/Index/Index.jsx';

const routes = [
  {
    component: App,
    routes: [
      {
        name: 'index',
        path: '/',
        exact: true,
        component: Index,
      }
    ]
  }
];

export default routes;
export const generate = makeGenerator(routes);