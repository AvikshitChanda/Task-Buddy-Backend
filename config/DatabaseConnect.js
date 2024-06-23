const mongoose = require('mongoose');

const DatabaseConnect = () => {
  mongoose.connect(process.env.Mongo_Url)
  .then(() => {
    console.log('Database Connected successfully!');
  })
  .catch((e) => {
    console.log('Error in connecting the database:', e);
  });
};

module.exports = DatabaseConnect;
