import querystring from 'querystring';

function combineSegments(firstSeg, secSeg) {
  let nseg = '';
  if (firstSeg && firstSeg.substr(-1) === '/') {
    nseg = firstSeg.substr(0, firstSeg.length-1);
  } else {
    nseg += firstSeg;
  }

  if (secSeg && secSeg.substr(0, 1) !== '/') {
    nseg += '/' + secSeg;
  } else if (secSeg) {
    nseg += secSeg;
  }

  return nseg;
}

function combineNames(prefix, name) {
  let nname = '';
  if (prefix) {
    nname = prefix + (name ? '.' : '');
  }
  return nname + (name || '');
}

function extractParameters(endpoint) {
  const regex = /:([a-z-_]+)(\([^\)]+\))?(\??)/ig;
  const parameters = [];
  let matches = null;
  while((matches = regex.exec(endpoint)) !== null) {
    parameters.push({ 
      expr: matches[0],
      name: matches[1], 
      strRegex: matches[2],
      regex: (matches[2] ? new RegExp(`^${matches[2]}$`, 'g') : null),
      optional: matches[3] === '?' 
    });
  }
  return parameters;
}

function flattenRoutes(prefix, firstSegment, reactRoutes) {
  return reactRoutes.reduce((routes, reactRoute) => {
    const name = combineNames(prefix, reactRoute.name);
    //pour l'instant on a pas de notion de sous route explicite avec l'ami react router
    const path = reactRoute.path; //combineSegments(firstSegment, reactRoute.path);
    const parameters = extractParameters(path);
    let rRoutes = {};
    
    if (reactRoute.routes) {
      rRoutes = flattenRoutes(name, path, reactRoute.routes);
    }

    if (name) {
      rRoutes[name] = { path, name, parameters };
    }

    return {
      ...routes,
      ...rRoutes
    };
  }, {});
}

export default function makeGenerator(reactRoutes, pathPrefix = '', namePrefix = '') {
  const routes = flattenRoutes(pathPrefix, namePrefix, reactRoutes);

  return function({ name, parameters = {}, search }) {
    const route = routes[name];

    if (!route) {
      throw new Error(`Cannot found route names ${name}`);
    }
    
    let path = route.path;
    for (let i = 0; i < route.parameters.length; i++) {
      const parameter = parameters[route.parameters[i].name];
      if (!parameter && !route.parameters[i].optional) {
        throw new Error(`Parameter "${route.parameters[i].name}" must be defined`);
      }
      if (parameter && route.parameters[i].regex && !route.parameters[i].regex.test(parameter)) {
        throw new Error(`Invalid parameter "${route.parameters[i].name}", it must match "${route.parameters[i].strRegex}"`);
      }
      path = path.replace(`${route.parameters[i].expr}`, (parameter === undefined ? '' : parameter));
    }

    if (search) {
      const searchParams = querystring.stringify(search);
      path += (searchParams ? '?' + searchParams : '');
    }

    return path;
  };
};