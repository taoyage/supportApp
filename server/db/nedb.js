var Datastore = require('nedb');

module.exports = { 
	users : new Datastore({filename: './server/stores/users.json',autoload: true}),
	log : new Datastore({filename: './server/stores/log.json',autoload: true})
};


