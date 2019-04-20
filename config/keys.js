module.exports = {
	'MongoURI' : 'mongodb://tab_al:#Qwerty1234@cluster0-shard-00-00-obgzq.mongodb.net:27017,cluster0-shard-00-01-obgzq.mongodb.net:27017,cluster0-shard-00-02-obgzq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
	'fb': {
		'clientID' : '787486501643805',
		'clientSecret' : 'a0600fdac1fe8349909970aed39163b5',
		'callbackURL' : 'http://localhost:3000/login/facebook/callback',
		'profileFields' : ["id","displayName","picture.type(large)","email"]
	}
}