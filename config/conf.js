require('dotenv').config();
const path = require('path');
const debug = (process.env.NODE_ENV !== 'production'); 

const root = process.cwd();
const appSrc = path.join(root, 'src');
const appPublic = path.join(root, 'public');

const conf = {
  NODE_ENV: process.env.NODE_ENV,
  WS_URL: process.env.WS_URL || 'ws://localhost/', 
  debug,
  appSrc,
  appPublic,
  appNodeModules: path.join(root, 'node_modules'),
  appIndexJs: path.join(appSrc, 'index.js'),
  appHtml: path.join(appPublic, 'index.html'),
  appBuild: path.join(root, 'build'),
  appPackageJson: path.join(root, 'package.json'),
  webRoot: (debug ? '/' : './')
};

const sharedKeys = [ 'webRoot', 'NODE_ENV', 'WS_URL' ];
conf.sharedEnvConf = sharedKeys.reduce((prev, key) => {
  prev[key] = JSON.stringify(conf[key]);
  return prev;  
}, {});

conf.sassSharedEnvConf = sharedKeys.reduce((prev, key) => {
  return `${prev} $${key}: '${conf[key]}';`;
}, '');

module.exports = conf;