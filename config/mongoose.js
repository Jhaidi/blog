const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  console.log(`Connecting to mongo @: ${config.uri}`);
  mongoose.connect(config.uri, {
    useNewUrlParser: true
  });
  return mongoose.connection;
};

exports.disconnect = () => {
  mongoose.disconnect(() => {
    console.log(`disconnect : ${config.uri}`);
  });
}