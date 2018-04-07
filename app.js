const koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const mount = require('koa-mount');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const _ = require('lodash');
const fs = require('fs');
const ClientApp = require('./js/ClientApp.jsx');

const baseTemplate = fs.readFileSync('./baseTemplate.html');
const templateFn = _.template(baseTemplate);
const PORT = 3000;

const app = koa();

app.use(mount('/public', serve('./public')));

app.use(
  route.get('/', function*(req, res) {
    console.log(req);
    const rendered = ReactDOMServer.renderToString(
      React.createElement(ClientApp)
    );
    this.body = templateFn({ body: rendered });
  })
);

console.log('listening on port', PORT);
