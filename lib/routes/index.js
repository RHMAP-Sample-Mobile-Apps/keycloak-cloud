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

  route.use(session({
    secret: 'keycloakDemoSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

  var keycloak = new Keycloak({
    store: memoryStore
  });

  route.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
  }));

  //Public route, no authentication needed.
  route.get('/no-authentication-needed', function(req, res, next) {
    console.log('Route does not need authentication. ' + JSON.stringify(req.headers, null, 4));
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

  //Secured Route, authentication required
  route.get('/needs-authentication', keycloak.protect(), function(req, res, next) {
    console.log('Route needs authentication. ' + JSON.stringify(req.headers, null, 4));
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

  //Secured Route, user role required
  route.get('/needs-user-role', keycloak.protect('realm:user'), function(req, res, next) {
    console.log('Route needs user role authorization. ' + JSON.stringify(req.headers, null, 4));
    var returnMessage = {};
    try {
      var message = needsAuthentication.sayHelloToUsers();
      returnMessage = {
        msg: message
      };
    }
    catch(e) {
      return next(e);
    }
    res.json(returnMessage);
  });

  //Secured Route, supervisor role required
  route.get('/needs-supervisor-role', keycloak.protect('app:supervisor'), function(req, res, next) {
    console.log('Route needs supervisor role authorization. ' + JSON.stringify(req.headers, null, 4));
    var returnMessage = {};
    try {
      var message = needsAuthentication.sayHelloToSupervisors();
      returnMessage = {
        msg: message
      };
    }
    catch(e) {
      return next(e);
    }
    res.json(returnMessage);
  });

  //Secured Route, admin role required.
  route.get('/needs-admin-role', keycloak.protect('app:admin'), function(req, res, next) {
    console.log('Route needs admin role authorization. ' + JSON.stringify(req.headers, null, 4));
    var returnMessage = {};
    try {
      var message = needsAuthentication.sayHelloToAdmins();
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
