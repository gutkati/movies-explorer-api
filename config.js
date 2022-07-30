const MONGO_DEFAULT_URL = 'mongodb://localhost:27017/moviesdb'

module.exports.MONGO_URL = process.env.MONGO_URL || MONGO_DEFAULT_URL;
module.exports.SECRET_KEY = 'some-secret-key';