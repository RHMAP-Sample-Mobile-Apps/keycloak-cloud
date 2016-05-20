'use strict';

require('http').globalAgent.maxSockets = 1000;
require('https').globalAgent.maxSockets = 1000;

var mbaasApi = require('fh-mbaas-api'),
express = require('express'),
mbaasExpress = mbaasApi.mbaasExpress(),
cors = require('cors'),
app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys([]));
app.use('/mbaas', mbaasExpress.mbaas);

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

//This is our router
require('lib/routes')(app);

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log('App started at: ' + new Date() + ' on port: ' + port);
});
