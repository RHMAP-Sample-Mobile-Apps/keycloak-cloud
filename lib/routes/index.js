'use strict';
var route = new require('express').Router(),
session = require('express-session'),
bodyParser = require('body-parser'),
jsonBodyParser = bodyParser.json(),
Keycloak = require('keycloak-connect'),
noAuthenticationNeeded = require('lib/no-authentication-needed'),
needsAuthentication = require('lib/needs-authentication');

module.exports = function(app) {

  app.use('/keycloak-demo', route);
  app.use(jsonBodyParser);

  var memoryStore = new session.MemoryStore();

  app.use(session({
    secret: 'keycloakDemoSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

  var keycloak = new Keycloak({
    store: memoryStore
  });

  app.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
  }));

  route.get('/no-authentication-needed', function(req, res, next) {
    var returnMessage = {};
    try {
      var message = noAuthenticationNeeded.sayHelloToEveryone();
      returnMessage = {
        msg: message
      };
    }
    catch(e) {
      return next(e);
    }
      res.json(returnMessage);
  });

  route.get('/needs-authentication', keycloak.protect(), function(req, res, next) {
    var returnMessage = {};
    try {
      var message = needsAuthentication.sayHelloToAuthenticatedUsers();
      returnMessage = {
        msg: message
      };
    }
    catch(e) {
      return next(e);
    }
      res.json(returnMessage);
  });

};
