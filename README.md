# Keycloak Demo
Demonstrates how Apps on RH MAP can integrate easily with Keycloak to provide
a standardized solution for authentication and authorization.

This API uses Keycloak for Authentication and Authorization

#### To run this cloud app locally:
* Use git to clone the repo locally
* Run npm install
* Run grunt serve

# Group No Authentication Needed

# no-authentication-needed [/keycloak-demo/no-authentication-needed]

'No Authentication' endpoint.

## no-authentication-needed [GET]

'No Authentication' endpoint.

+ Request (application/json)

+ Response 200 (application/json)
    + Body
            {
              "msg": "Welcome to the unsecured part of this API!"
            }
