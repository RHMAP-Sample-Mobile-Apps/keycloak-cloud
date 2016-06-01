'use strict';

exports.sayHelloToAuthenticatedUsers = function sayHelloToAuthenticatedUsers() {
  return 'Congratulations, you have been authenticated via Keycloak!';
};
exports.sayHelloToUsers = function sayHelloToUsers() {
  return 'Congratulations, you are a verified user.';
};
exports.sayHelloToSupervisors = function sayHelloToSupervisors() {
  return 'Congratulations, you are a verified supervisor.';
};
exports.sayHelloToAdmins = function sayHelloToAdmins() {
  return 'Congratulations, you are a verified administrator.';
};
