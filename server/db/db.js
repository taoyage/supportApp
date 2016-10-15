    var settings = require('../config/dbConfig'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
    module.exports = new Db(settings.db, new Server(settings.host, settings.port),
    	{safe: true});