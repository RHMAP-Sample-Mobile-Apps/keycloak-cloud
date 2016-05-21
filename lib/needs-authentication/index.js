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
exports.sayHelloToAdministrators = function sayHelloToAdminis() {
  return 'Congratulations, you are a verified administrator.';
};
