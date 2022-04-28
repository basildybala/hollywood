// const mongoClient = require("mongodb").MongoClient;

// require("dotenv").config();
// const state = {
//   db: null,
// };

// module.exports.connect = (done) => {
//   const url = 'mongodb+srv://dramaliteadmin:9633155729@dramalite.lg5ch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//   const dbname='movieshub';
  
//   mongoClient.connect(url, {  useNewUrlParser: true,useUnifiedTopology: true }, (err, data) => {
//     if (err) return done(err);
//     state.db = data.db(dbname);
//     done();
//   });
 

// };

// module.exports.get = () => {
//   return state.db;
// };
const mongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const state = {
  db: null,
};
module.exports.connect = (done) => {
  const url = 'mongodb://localhost:27017'
  const dbname = 'hollywood'

  mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
    if (err) return done(err);
    state.db = data.db(dbname);
    done();
  });
};

module.exports.get = () => {
  return state.db;
};

module.exports.get = () => {
  return state.db;
};