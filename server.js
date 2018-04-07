/* eslint no-console:0 */
require('babel-core/register');
require('babel-polyfill');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
const compression = require('compression');
const webpack = require('webpack');
const config = require('./webpack.config');
const App = require('./js/App').default;
const Window = require('window');
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC_Mba3-WKoP0XHz-XjCNDf3yc8FIiUa7g',
  authDomain: 'jelenastevanovic-cd802.firebaseapp.com',
  databaseURL: 'https://jelenastevanovic-cd802.firebaseio.com',
  projectId: 'jelenastevanovic-cd802',
  storageBucket: 'jelenastevanovic-cd802.appspot.com',
  messagingSenderId: '300544889679'
};
const database = firebase.database();
database.ref('/').on('value', snapshot => {
  const databaseo = snapshot.val();
  console.log(
    fs.writeFile('database.json', JSON.stringify(databaseo), 'utf8', () =>
      console.log('DONE')
    )
  );
});

const api_key = 'key-646af459e2bee923e52500a9f96c0b8a';
const DOMAIN = 'scsworkplace.ml';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

const StaticRouter = ReactRouter.StaticRouter;
const port = 8081;
const baseTemplate = fs.readFileSync('./index.html');
const template = _.template(baseTemplate);

const server = express();
server.use(compression());
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  server.use(webpackHotMiddleware(compiler));
}
server.use('/public', express.static('./public'));

server.use((req, res) => {
  const context = {};

  const body = ReactDOMServer.renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      React.createElement(App)
    )
  );

  if (context.url) {
    res.redirect(301, context.url);
  }
  const window = new Window();
  const document = window.document;
  res.write(template({ body }));
  res.end();
});

console.log(`listening on ${port}`);
server.listen(port);
